// import { API_URL } from 'config';
// import React, { createContext, useEffect, useState } from 'react';
// import { Cookies } from 'react-cookie';
// import io from 'socket.io-client';
// const cookies = new Cookies();
// const SOCKET_URL = `${API_URL}`;

// export const WebSocketContext = createContext({});

// const WebSocketProvider = (props) => {
//   const [socket, setSocket] = useState(undefined);

//   // const dispatch = useDispatch();

//   // const sendMessage = (roomId, message) => {

//   // }

//   useEffect(() => {
//     if (!socket) {
//       const s = io(SOCKET_URL, {
//         withCredentials: true,
//         extraHeaders: {
//           token: cookies.get('token') || ''
//         }
//       });

//       s.on('connect', () => {
//         console.log('connection established', s.connected); // true
//       });
//       setSocket(s);
//       // socket.on('event://get-message', (msg) => {
//       //   const payload = JSON.parse(msg);
//       //   dispatch(updateChatLog(payload));
//       // });
//     }
//   }, []);

//   return (
//     <WebSocketContext.Provider value={{ socket }}>
//       {props.children}
//     </WebSocketContext.Provider>
//   );
// };

// export default WebSocketProvider;
