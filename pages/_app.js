import '@/styles/globals.css';
import { BlogContextProvider } from '@/context/blogContext';
export default function App({ Component, pageProps }) {
  return (
    <>
      <BlogContextProvider>
        <Component {...pageProps} />
      </BlogContextProvider>
    </>
  );
}
