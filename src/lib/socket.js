/*import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export default socket;*/

import { io } from 'socket.io-client';

let socket;
export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api','') || 'http://localhost:5000', {
      transports: ['websocket']
    });
  }
  return socket;
};

export const joinAdminRoom = () => {
  if (!socket) socket = initSocket();
  socket.emit('join-admin');
};

export const getSocket = () => socket;

