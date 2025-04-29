import * as React from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { LoginDialog } from '../Dialog/LoginDialog';
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
    return JSON.parse(localStorage.getItem('user') || '{}');
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="w-full border-b border-orange-100 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center group">
         
          <span className="ml-2 hidden text-2xl font-bold text-gray-900 sm:block">
            Wander<span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Wise</span>
          </span>
        </a>
  
        {/* Auth section */}
        <div>
          {authUser?.name ? (
            <div className="flex items-center gap-4">
              <a href="/create-trip">
                <Button className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg transition-all">
                  + Create Trip
                </Button>
              </a>
              
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full border-orange-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400">
                  My Trips
                </Button>
              </a>
              
              <Popover>
                <PopoverTrigger asChild>
                  <div className="ml-4 h-10 w-10 rounded-full border-2 border-orange-200 cursor-pointer hover:border-orange-300 transition-all shadow-sm">
                    <img
                      src={authUser.picture}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 rounded-xl border-orange-100 shadow-lg">
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="rounded-full border-orange-200 text-gray-700 hover:bg-orange-50">
                      Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="rounded-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
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
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg px-6 py-2"
              >
                Sign In
              </Button>
              <LoginDialog
                open={isAuthDialogOpen}
                onOpenChange={setIsAuthDialogOpen}
                login={login}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;