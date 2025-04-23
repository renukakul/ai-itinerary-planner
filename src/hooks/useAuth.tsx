// hooks/useAuth.ts
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'sonner';

export const useAuth = () => {
  const [authUser, setauthUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user') || 'null');
  });
  
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: 'application/json'
            }
          }
        );
        
        localStorage.setItem('user', JSON.stringify(userInfo.data));
        setauthUser(userInfo.data);
        setIsAuthDialogOpen(false);
        toast.success('Login successful');
        return userInfo.data; // Return user data for chaining
      } catch (error) {
        toast.error('Failed to fetch user profile');
        throw error;
      }
    },
    onError: () => {
      toast.error('Login failed');
    }
  });

  const logout = () => {
    localStorage.removeItem('user');
    setauthUser(null);
    window.location.reload();
  };

  return {
    authUser,
    login,
    logout,
    isAuthDialogOpen,
    setIsAuthDialogOpen,
    openAuthDialog: () => setIsAuthDialogOpen(true)
  };
};