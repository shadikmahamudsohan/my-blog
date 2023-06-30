import '@/styles/globals.css';
import '@/styles/navbar.css';
import '@/styles/bgLight.css';
import '@/styles/banner.css';
import { BlogContextProvider } from '@/context/blogContext';
import { UserContextProvider } from '@/context/userContext';
export default function App({ Component, pageProps }) {
  return (
    <>
      <BlogContextProvider>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </BlogContextProvider>
    </>
  );
}
