import * as SecureStore from 'expo-secure-store';


const TOKEN_KEY = 'phone_number';

export const setTokenAsync = async (token: string) => {

    await SecureStore.setItemAsync(TOKEN_KEY, token);
    
}


export const getTokenAsync = async () => {

    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    return token;
    
}

export const emptyTokenAsync = async () => {

    const x = await SecureStore.deleteItemAsync(TOKEN_KEY);
    
}


// export const getToken = async () => {

//     const token = SecureStore.getItem(TOKEN_KEY);

//     return token;
    
// }


// export const setToken = async (token: string) => {

//     SecureStore.setItem(TOKEN_KEY, token);
    
// }