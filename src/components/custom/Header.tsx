import * as React from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { LoginDialog } from '../Dialog/LoginDialog';
import { useCreateTripForm } from '@/hooks/useCreateTripForm';
import { useAuth } from '@/hooks/useAuth';


function Header() {
 
  const { 
    authUser, 
    login, 
    logout, 
    isAuthDialogOpen, 
    setIsAuthDialogOpen 
  } = useAuth();
  const [user, setUser] = React.useState(() => {
    // Initialize user state from localStorage
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Update the user state to null
    window.location.reload(); // Optional: Reload the page
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

 

  return (
    <div className="w-full border-b border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="WanderWise" 
            className="h-9 w-auto transition-all hover:opacity-80"
            width={140}
            height={36}
          />
          <span className="ml-2 hidden text-xl font-semibold text-gray-800 sm:block">
            Wander<span className="text-red-500">Wise</span>
          </span>
        </div>
  
        {/* Auth section */}
        <div>
          {authUser?.name ? (
            <div className="flex items-center gap-4">
              <Button variant="outline" className="rounded-full">My Trips</Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div className="ml-4 h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer">
                    <img
                      src={authUser.picture}
                      alt="Profile"
                      className="h-full w-full rounded-full"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="rounded-full">
                      Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="rounded-full"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <>
              <Button 
                onClick={() => setIsAuthDialogOpen(true)} 
                variant="outline" 
                className="rounded-full"
              >
                Sign In
              </Button>
              <LoginDialog
                open={isAuthDialogOpen}
                onOpenChange={setIsAuthDialogOpen}
                login={login}  // Fixed typo from "onGooleLogin" to "login"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;