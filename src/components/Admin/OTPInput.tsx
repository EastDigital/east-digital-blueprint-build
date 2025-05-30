
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
}

export const OTPInput = ({ value, onChange, length = 6, className }: OTPInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, newValue: string) => {
    // Only allow single digit
    if (newValue.length > 1) return;
    
    const newOtp = value.split('');
    newOtp[index] = newValue;
    const updatedOtp = newOtp.join('');
    
    onChange(updatedOtp);
    
    // Auto-focus next input if current is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedValue = text.replace(/\D/g, '').slice(0, length);
        onChange(pastedValue);
        
        // Focus the last filled input or the last input
        const nextIndex = Math.min(pastedValue.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedValue);
    
    // Focus the last filled input or the last input
    const nextIndex = Math.min(pastedValue.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-700 bg-gray-800 text-white rounded-lg focus:border-eastdigital-orange focus:outline-none focus:ring-2 focus:ring-eastdigital-orange/20 transition-all"
        />
      ))}
    </div>
  );
};
