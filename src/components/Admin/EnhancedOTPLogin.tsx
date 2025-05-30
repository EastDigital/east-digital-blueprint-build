
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Shield, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OTPInput } from './OTPInput';
import { useDeviceFingerprint } from './DeviceFingerprint';
import { supabase } from '@/integrations/supabase/client';

export const EnhancedOTPLogin = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const { login } = useAuth();
  const deviceFingerprint = useDeviceFingerprint();

  const checkTrustedDevice = async () => {
    if (!deviceFingerprint) return false;
    
    try {
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

      if (error || !data) return false;

      // Update last used timestamp for the device
      await supabase
        .from('trusted_devices')
        .update({ last_used_at: new Date().toISOString() })
        .eq('admin_user_id', data.id)
        .eq('device_fingerprint', deviceFingerprint);

      return true;
    } catch {
      return false;
    }
  };

  const addTrustedDevice = async (adminUserId: string) => {
    if (!deviceFingerprint || !rememberDevice) return;
    
    try {
      const deviceName = `${navigator.platform} - ${navigator.userAgent.split(' ')[0]}`;
      
      await supabase
        .from('trusted_devices')
        .insert({
          admin_user_id: adminUserId,
          device_fingerprint: deviceFingerprint,
          device_name: deviceName
        });
    } catch (error) {
      console.error('Failed to add trusted device:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if this is a trusted device
      const isTrusted = await checkTrustedDevice();
      
      if (isTrusted) {
        // Auto-login for trusted devices
        login(email);
        return;
      }

      // Send OTP for non-trusted devices
      const response = await fetch('/supabase/functions/v1/send-admin-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setVerificationId(data.verificationId);
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
      const response = await fetch('/supabase/functions/v1/verify-admin-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          verificationId,
          otp,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Add this device as trusted if requested
      if (data.adminUserId) {
        await addTrustedDevice(data.adminUserId);
      }

      login(email);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
              ? 'Enter your admin email to continue' 
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
                    placeholder="admin@eastdigital.in"
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
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
                  <Smartphone className="h-4 w-4" />
                  Remember this device
                </Label>
              </div>

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
