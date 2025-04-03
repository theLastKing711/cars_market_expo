import { getTokenAsync } from "@/libs/axios/secureStorage";
import { useEffect } from "react";
import useAuthStore from "./useAuthStore";

 export const useInitializeAccessToken = () => {

  const { saveToken, emptyToken } = useAuthStore();
  
    useEffect(() => {
        const retriveToken = async () => {
          const access_token = await getTokenAsync();

          // saveToken('');
          // if (access_token) {
          //   saveToken(access_token);
          // }
          // emptyToken();
        };
    
        retriveToken();
      }, []);
 }
