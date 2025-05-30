
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { OTPInput } from './OTPInput';
import { useAuth } from '@/contexts/AuthContext';

interface OTPAdminLoginProps {
  onLoginSuccess: () => void;
}

export const OTPAdminLogin = ({ onLoginSuccess }: OTPAdminLoginProps) => {
  const [email, setEmail] = useState('info@eastdigital.in');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const { toast } = useToast();
  const { login } = useAuth();

  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && verificationId && step === 'otp') {
      handleVerifyOTP();
    }
  }, [otp, verificationId, step]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First check if this email is an admin
      const { data: adminCheck, error: adminError } = await supabase
        .from('admin_users')
        .select('id, email')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (adminError || !adminCheck) {
        toast({
          title: "Access Denied",
          description: "This email is not authorized for admin access.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Generate OTP and send email
      const { data, error } = await supabase.functions.invoke('send-admin-otp', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setVerificationId(data.verificationId);
        setStep('otp');
        setOtp(''); // Clear any previous OTP
        toast({
          title: "OTP Sent",
          description: "Please check your email for the verification code.",
        });
      } else {
        throw new Error(data.error || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!verificationId || otp.length !== 6) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-admin-otp', {
        body: { 
          email,
          otp,
          verificationId 
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        login(email);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel.",
        });
        onLoginSuccess();
      } else {
        throw new Error(data.error || 'Invalid OTP');
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      });
      setOtp(''); // Clear OTP on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setVerificationId(null);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {step === 'email' ? (
              <Mail className="h-12 w-12 text-eastdigital-orange" />
            ) : (
              <Shield className="h-12 w-12 text-eastdigital-orange" />
            )}
          </div>
          <CardTitle className="text-2xl text-white">
            {step === 'email' ? 'Admin Access' : 'Verify Code'}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === 'email' 
              ? 'Enter your admin email to receive verification code'
              : 'Enter the 6-digit code sent to your email'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Verification Code'}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp" className="text-white">Verification Code</Label>
                <div className="mt-2">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    length={6}
                  />
                </div>
              </div>
              {isLoading && (
                <div className="text-center text-gray-400">
                  Verifying...
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBackToEmail}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleVerifyOTP}
                  className="flex-1 bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
