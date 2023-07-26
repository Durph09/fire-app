import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "@/lib/context";

import { useUserData } from "@/lib/hooks";

export default function App({ Component, pageProps }) {

  const userData = useUserData();
  console.log('_app .js 11 userData:', userData)
  
  return (
    <UserContext.Provider value={{userData}}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}
