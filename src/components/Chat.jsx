import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import MessageBox from "./MessageBox";
import { setChat } from "../REDUX/chatSlice";


function Chat() {

    const location = useLocation();
    const user = location.state;
    const [typeMessage, setTypeMessage] = useState("")
    const [newSocket, setNewSocket] = useState()
    const [id, setUserId] = useState()
    const boxref = useRef(null)
    const dispatch = useDispatch()
    const datared = useSelector(state => state.chatReducer)

    useEffect(() => {

        const socket = io("https://chat-app-server-nm76.onrender.com");
        setNewSocket(socket)

        socket.on("connect", () => {
            setUserId(socket.id)
        });
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            dispatch(setChat(data))
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            dispatch(setChat(data))
            console.log(data.user, data.message);
        })

        socket.on('sendMessage', (data) => {
            dispatch(setChat(data))
            console.log(data.user, data.message, data.id);
        })

        socket.on('disconnect', () => {
            socket.emit("disconnect", { user })
        })

        socket.on('leave', (data) => {
            dispatch(setChat(data))
            console.log(data.user, data.message);
        })

    }, []);

    const send = () => {
        if (typeMessage != "") {
            newSocket.emit('message', { message: typeMessage, id })
            setTypeMessage("")
        }
    }

    useEffect(() => {
        console.log(datared);
    }, [datared])

    useEffect(() => {
        boxref.current?.lastElementChild?.scrollIntoView()
    }, [datared])

    return (
        <>
            <div
                style={{ height: "100vh", width: '100vw', backgroundColor: "black", paddingLeft: '30vw', paddingRight: '30vw' }}
                className="d-flex justify-content-center align-items-center ">
                <div className="box">

                    <div style={{ backgroundColor: '#435A64', height: '80px' }} className="rounded-top">
                        <div className="align-items-center d-flex justify-content-start p-4">
                            <h2 style={{ color: 'white', fontSize: "30px" }}><i className="fa-regular fa-comments icon "></i> Chat<span style={{ fontSize: '20px' }}><em>app</em></span></h2>
                        </div>
                    </div>
                    <div ref={boxref} className="chatarea" style={{ height: "76%", marginBottom: '-20px' }}>
                        {datared && datared.map((item, index) => (
                            <MessageBox user={user} name={item.user} message={item.message} />
                        ))}
                    </div>
                    <div className="inputbox px-2 py-2 mt-3 d-flex" style={{ height: "12%", width: "100%" }}>
                        <input onChange={(e) => setTypeMessage(e.target.value)} value={typeMessage} style={{ width: "90%", height: "70%" }} type="text" className="me-2 inp" placeholder="Message" />
                        <button onClick={() => send()} className="button" ><i style={{ color: 'white' }} className="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chat;