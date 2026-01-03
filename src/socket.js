import { io } from "socket.io-client";

const socket = io("https://onway-backend-6kfr.onrender.com", {
  autoConnect: false,
  transports: ["websocket"], 
});

export default socket;
