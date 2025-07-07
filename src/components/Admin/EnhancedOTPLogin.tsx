
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Shield, Smartphone, Fingerprint } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OTPInput } from './OTPInput';
import { useDeviceFingerprint } from './DeviceFingerprint';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const EnhancedOTPLogin = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('info@eastdigital.in');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const { login } = useAuth();
  const deviceFingerprint = useDeviceFingerprint();
  const { toast } = useToast();

  const checkTrustedDevice = async () => {
    if (!deviceFingerprint) return false;
    
    try {
      console.log('Checking trusted device with fingerprint:', deviceFingerprint);
      
      const { data, error } = await supabase
        .from('admin_users')
        .select(`
          id,
          trusted_devices!inner(*)
        `)
        .eq('email', email)
        .eq('trusted_devices.device_fingerprint', deviceFingerprint)
        .eq('trusted_devices.is_active', true)
        .single();

      if (error) {
        console.error('Error checking trusted device:', error);
        return false;
      }

      if (data) {
        console.log('Trusted device found, auto-logging in');
        
        // Update last used timestamp for the device
        await supabase
          .from('trusted_devices')
          .update({ last_used_at: new Date().toISOString() })
          .eq('admin_user_id', data.id)
          .eq('device_fingerprint', deviceFingerprint);

        return true;
      }

      return false;
    } catch (err) {
      console.error('Error in checkTrustedDevice:', err);
      return false;
    }
  };

  const addTrustedDevice = async (adminUserId: string) => {
    if (!deviceFingerprint || !rememberDevice) return;
    
    try {
      const deviceName = `${navigator.platform} - MacBook Air M4`;
      
      console.log('Adding trusted device:', { adminUserId, deviceFingerprint, deviceName });
      
      const { error } = await supabase
        .from('trusted_devices')
        .insert({
          admin_user_id: adminUserId,
          device_fingerprint: deviceFingerprint,
          device_name: deviceName
        });

      if (error) {
        console.error('Failed to add trusted device:', error);
      } else {
        console.log('Trusted device added successfully');
        toast({
          title: "Device Remembered",
          description: "This device has been marked as trusted for future logins.",
        });
      }
    } catch (error) {
      console.error('Failed to add trusted device:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Restrict to only info@eastdigital.in
    if (email !== 'info@eastdigital.in') {
      setError('Admin access is restricted to authorized email addresses only.');
      toast({
        title: "Access Denied",
        description: "Admin access is restricted to authorized email addresses only.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Starting login process for:', email);
      
      // First verify the admin user exists
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (adminError || !adminCheck) {
        throw new Error('This email is not authorized for admin access.');
      }

      console.log('Admin user verified:', adminCheck);

      // Check if this is a trusted device
      const isTrusted = await checkTrustedDevice();
      
      if (isTrusted) {
        // Auto-login for trusted devices
        login(email);
        toast({
          title: "Welcome Back!",
          description: "Logged in using trusted device recognition.",
        });
        return;
      }

      console.log('Device not trusted, sending OTP');

      // Send OTP using Supabase edge function
      const { data, error } = await supabase.functions.invoke('send-admin-otp', {
        body: { email }
      });

      console.log('OTP function response:', { data, error });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setVerificationId(data.verificationId);
      setStep('otp');
      setOtp('');
      
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
      
      // Show OTP in console for demo purposes
      if (data.otp) {
        console.log('Demo OTP:', data.otp);
        toast({
          title: "Demo Mode",
          description: `OTP: ${data.otp} (check console for development)`,
          variant: "default",
        });
      }
    } catch (err: any) {
      console.error('Error in handleEmailSubmit:', err);
      setError(err.message || 'An error occurred');
      toast({
        title: "Error",
        description: err.message || 'An error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      console.log('Verifying OTP:', { verificationId, otp: otp.substring(0, 2) + 'xxxx' });

      const { data, error } = await supabase.functions.invoke('verify-admin-otp', {
        body: {
          email,
          otp,
          verificationId,
        }
      });

      console.log('OTP verification response:', { data, error });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Get admin user ID for trusted device
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', email)
        .single();

      // Add this device as trusted if requested
      if (adminUser && rememberDevice) {
        await addTrustedDevice(adminUser.id);
      }

      login(email);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
    } catch (err: any) {
      console.error('Error in handleOTPSubmit:', err);
      setError(err.message || 'An error occurred');
      setOtp(''); // Clear OTP on error
      toast({
        title: "Verification Failed",
        description: err.message || 'Invalid OTP. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-eastdigital-orange/20 rounded-full w-fit">
            <Shield className="h-8 w-8 text-eastdigital-orange" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Admin Access
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === 'email' 
              ? 'Authorized admin access only' 
              : 'Enter the verification code sent to your email'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@eastdigital.in"
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    required
                    readOnly
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Admin access is restricted to authorized email addresses
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember-device"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="remember-device" className="text-gray-300 text-sm flex items-center gap-2">
                  <Fingerprint className="h-4 w-4" />
                  Remember this device (MacBook Air M4)
                </Label>
              </div>

              {deviceFingerprint && (
                <div className="text-xs text-gray-500 bg-gray-800 p-2 rounded">
                  Device ID: {deviceFingerprint}
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                disabled={isLoading}
              >
                {isLoading ? 'Checking...' : 'Continue'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-4">
                  Code sent to <span className="text-eastdigital-orange">{email}</span>
                </p>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  length={6}
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify Code'}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white"
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                    setError('');
                  }}
                >
                  Back to email
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
