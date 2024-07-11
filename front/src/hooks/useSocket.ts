// utils/socket.js
import { io } from 'socket.io-client';

const socket = io('https://fivetart-travel-kafg.onrender.com'); // Asegúrate de usar la URL correcta de tu servidor

export default socket;
