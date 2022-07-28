import '../styles/globals.css'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

const publicPages = [
  '/',
];

function MyApp({ Component, pageProps }) {
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);
  const GetUserDetails = () => {
    const { userId, isSignedIn } = useAuth();
    
    useEffect(() => {
      async function getUserDetails() {
        if(!isSignedIn){
          localStorage.removeItem('uid')
        }else{
          localStorage.setItem('uid', userId)
        }
      }
      getUserDetails();
    })
    return null;
  }
  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider>
      {isPublicPage ? (
        <>
        <Component {...pageProps} />
        <GetUserDetails />
        </>
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
            <GetUserDetails />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
