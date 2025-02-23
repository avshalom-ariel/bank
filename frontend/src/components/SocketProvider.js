

import React, {useEffect, useRef, useState, createContext, useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file for styling
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

const SocketProvider = ( {children} ) => {
    const [socket, setSocket] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const url = 'http://localhost:3003'//process.env.BANK_APP_URL;

    console.log("url = " + process.env.BANK_APP_URL);

    useEffect(() => {
        // Initialize socket connection when the component mounts
        const socketInstance = io.connect(url);
        setSocket(socketInstance);

        // Cleanup when component unmounts
        // return () => {
        //     socketInstance.disconnect();
        // };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );



    // const socket = useRef(null);
    // const [hasNewMessage, setHasNewMessage] = useState(false);
    // const url = 'http://localhost:3003';
    // const children = components.children;
    //     //io('http://localhost:3003'); // Connect to server
    //
    //
    //
    //
    //
    // useEffect(() => {
    //     socket.current = io.connect(url);
    //
    //     socket.current.on('connection', (socket) => {
    //
    //     });
    //
    //     socket.current.on('message', (message) => {
    //         setHasNewMessage(true);
    //     })
    //
    //     socket.current.on('disconnect', () => {})
    // })
    //
    // const handleConnect = () => {
    //
    // };
    //
    // return (
    //     <>{children}</>
    // );
};

export default SocketProvider;
