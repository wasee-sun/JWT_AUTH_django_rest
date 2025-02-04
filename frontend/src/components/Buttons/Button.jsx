'use client';

import { signIn, signOut } from "next-auth/react";
import { useState, useRef } from "react";
import { useFormStatus } from 'react-dom';
import { logoutAction } from "@/actions/authActions";
import { BASE_ROUTE } from "@/route";
import baseStyles from './Button.module.css';
import socialStyles from './SocialLoginButton.module.css';

export const LoginButton = ({ disabled }) => {
  const { pending } = useFormStatus();

  return (
    <button 
    type="submit" 
    disabled={disabled || pending} 
    className={baseStyles.loginButton}
    >
      {pending ? 'Logging in...' : disabled ? 'Login' : 'Login'}
    </button>
  );
};

// both the forms use same form status shouldn't be duplicated
export const OtpVerifyButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={baseStyles.otpVerifyButton}>
      {pending ? 'Verifying...' : 'Verify OTP'}
    </button>
  );
};

export const ResendOtpButton = ({ onClick, disabled, timer }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || pending}
      className={baseStyles.resendOtpButton}
    >
      {pending ? 'Resending...' : disabled ? `Resend OTP (${timer}s)` : 'Resend OTP'}
    </button>
  );
};

export const PhoneVerificationRequestButton = ({ onClick }) => {
  const { pending } = useFormStatus();

  return (
    <button 
      type="button" 
      onClick={onClick}
      disabled={pending} 
      className={baseStyles.updateButton}
    >
      {pending ? 'Verifying...' : 'Verify Phone'}
    </button>
  );  
};

export const EmailVerificationRequestButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={baseStyles.resetPassButton}>
      {pending ? "Sending..." : "Send Reset Link"}
    </button>
  )
};

export const PasswordResetButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={baseStyles.resetPassButton}>
      {pending ? "Resetting..." : "Reset Password"}
    </button>
  )
};

export const PasswordResetRequestButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={baseStyles.resetPassButton}>
      {pending ? "Sending..." : "Send Reset Link"}
    </button>
  )
};

function SocialLoginButton({ provider, isDisabled}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await signIn(provider, { redirectTo: `${BASE_ROUTE}` });
    } catch (error) {
      console.error("Error during social login:", error);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <button
      type="button"
      disabled={isDisabled || isLoading}
      className={`${socialStyles.button} ${socialStyles[provider.toLowerCase()]}`}
      onClick={handleClick}
    >
      {isLoading ? `Logging in with ${provider}...` : `Login with ${provider}`}
    </button>
  );
};

export const GoogleLoginButton = ({ isDisabled }) => {
  return (
    <SocialLoginButton
      provider="google"
      isDisabled={isDisabled}
    />
  );
};

export const FacebookLoginButton = ({ isDisabled }) => {
  return (
    <SocialLoginButton
      provider="facebook"
      isDisabled={isDisabled}
    />
  );
};

export const GitHubLoginButton = ({ isDisabled }) => {
  return (
    <SocialLoginButton
      provider="github"
      isDisabled={isDisabled}
    />
  );
};

export const LogOutButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await logoutAction();
      await signOut();
    } catch (error) {
      console.error("Error during social login:", error)
    }
    setIsLoading(false)
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={baseStyles.loginButton}
      onClick={handleClick}
    >
      <span>{isLoading ? `Logging out...` : `Logout`}</span>
    </button>
  );
};

export const RegisterButton = ({ disabled }) => {
  const { pending } = useFormStatus();

  return (
    <button 
    type="submit" 
    disabled={disabled || pending} 
    className={baseStyles.registerButton}>
      {pending ? "Registering..." : disabled ? 'Register' : 'Register'}
    </button>
  );
};

export const UpdateButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className={baseStyles.updateButton}>
      {pending ? "Updating..." : "Update Profile"}
    </button>
  );
};

export const UploadImageButton = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file)
      event.target.value = null;
    };
  };

  return (
    <div>
      <button onClick={handleClick} className={baseStyles.uploadImageButton}>
        Upload Image
      </button>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
    </div>
  );
};


// Needs fixing
// export function InstagramLoginButton() {
//   return (
//     <SocialLoginButton 
//     provider="Instagram" 
//     icon={<i className="fab fa-instagram"></i>} 
//   />
//   );
// };

// export function TwitterLoginButton() {
//   return ( <SocialLoginButton 
//   provider="Twitter" 
//   icon={<i className="fab fa-twitter"></i>} 
//   />
//   );
// };

// export function LinkedInLoginButton() {
//   return (
//     <SocialLoginButton 
//     provider="LinkedIn" 
//     icon={<i className="fab fa-linkedin-in"></i>} 
//   />
//   );
// };