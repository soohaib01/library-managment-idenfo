import "../styles/globals.css";
import Layout from "../components/navigation/Layout";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "../styles/Nprogress.css";
import Navbar from "../components/navigation/Navbar";
import {UserProvider} from "../Context/userContext"
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const showHeader = router.pathname === "/" || router.pathname === "/auth/registration" ?  false : true;
  
  return (
    <>
         <UserProvider>

      
      {showHeader && <Navbar />}
      <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
