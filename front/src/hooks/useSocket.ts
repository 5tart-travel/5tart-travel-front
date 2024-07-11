// utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Asegúrate de usar la URL correcta de tu servidor

export default socket;
