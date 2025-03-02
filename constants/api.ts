// export const BASE_URI = 'http://localhost:8000'; // IS THE DEFAULT WHEN WE TYPE PHP ARTISAN SERVE IN LARAVEL
// export const BASE_URI = 'http://192.168.1.107:8080';
//FOR LINUX OLD PC
// IS FROM LOGGING IT TO ROUTER SETTING AND GETTING IP ADDRESS OF THE PC HOSTING LARAVEL APP
//INTERFACE SETUP->DHCP->DHCP-TALBE->THE IP ADDRESS VALUE FOR THE DEVICE HOSTING LARAVEL PP

// export const BASE_URI = 'http://cars_market_laravel.test';

// export const BASE_URI = 'http://127.0.0.1:8000';

export const BASE_URI = 'http://192.168.1.102:8000'; 
//FOR WINDOWS 11 NEW PC
// IS FROM LOGGING IT TO ROUTER SETTING AND GETTING IP ADDRESS OF THE PC HOSTING LARAVEL APP
//INTERFACE SETUP->DHCP->DHCP-TALBE->THE IP ADDRESS VALUE FOR THE DEVICE HOSTING LARAVEL PP
export const HOME_URI = `${BASE_URI}/users/cars`;

export const AUTH_URL = `${BASE_URI}/users/auth`;

export const FILES_URL = `${BASE_URI}/files`;

export const FILES_MANY_URL = `${BASE_URI}/files/many`;