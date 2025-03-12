import { getTokenAsync } from "@/libs/axios/secureStorage";
import { useEffect } from "react";
import useAuthStore from "./useAuthStore";




 
 export const useInitializeAccessToken = () => {

  const { saveToken } = useAuthStore();
  
    useEffect(() => {
        const retriveToken = async () => {
          const access_token = await getTokenAsync();
    
          if (access_token) {
            saveToken(access_token);
          }
        };
    
        retriveToken();
      }, []);
 }
