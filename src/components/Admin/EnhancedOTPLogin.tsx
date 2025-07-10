
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OTPInput } from './OTPInput';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const EnhancedOTPLogin = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('info@eastdigital.in');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const { login } = useAuth();
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email !== 'info@eastdigital.in') {
      setError('Admin access is restricted to authorized email addresses only.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if admin user exists
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', email)
        .eq('is_active', true)
        .maybeSingle();

      if (adminError) {
        console.error('Database error:', adminError);
        throw new Error('Database connection error. Please try again.');
      }

      if (!adminCheck) {
        throw new Error('This email is not authorized for admin access.');
      }

      // Send OTP
      const { data, error } = await supabase.functions.invoke('send-admin-otp', {
        body: { email }
      });

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
      
      // Show OTP in console for demo
      if (data.otp) {
        console.log('Demo OTP:', data.otp);
        toast({
          title: "Demo Mode",
          description: `OTP: ${data.otp}`,
        });
      }
    } catch (err: any) {
      console.error('Error:', err);
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
      const { data, error } = await supabase.functions.invoke('verify-admin-otp', {
        body: {
          email,
          otp,
          verificationId,
        }
      });

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Invalid OTP');
      }

      login(email);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred');
      setOtp('');
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
                {isLoading ? 'Sending OTP...' : 'Send Verification Code'}
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
