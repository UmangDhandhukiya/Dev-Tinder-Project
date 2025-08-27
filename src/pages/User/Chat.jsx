import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/Constants';

const Chat = () => {
  const { targetuserid } = useParams();
  const [message, setmessage] = useState([]);
  const [newmessage, setnewmessage] = useState("")
  // console.log(targetuserid);
  const user = useSelector(store => store.user)
  const userId = user?._id;

  const fetchchatmessages = async () => {
    const chat = await fetch(BASE_URL + "/chat/" + targetuserid, {
      credentials: "include",
    });
    const data = await chat.json()
    console.log(data.messages);
    const chatmessages = data?.messages.map((msg) => {
      return {senderId: msg?.senderId?._id, firstname: msg?.firstname, lastname: msg?.lastname, text: msg.text };
    });
    setmessage(chatmessages)
  };

  useEffect(() => {
    fetchchatmessages();
  }, [])

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstname: user.firstname, userId, targetuserid });

    socket.on("messageReceiveived", ({firstname, text }) => {
      console.log(firstname + " " + text);
      setmessage((message) => [...message, { firstname, text }])
    })

    return () => {
      socket.disconnect();
    }
  }, [userId, targetuserid])

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", { firstname: user.firstname, lastname: user.lastname, userId, targetuserid, text: newmessage })
    setnewmessage("")
  }

  return (
    <>
     <div className="flex flex-col h-[90vh] bg-gray-100">
  {/* Header */}
  <div className="p-4 bg-blue-600 text-white font-semibold text-lg shadow">
    Chat Support
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 space-y-3">
    {message.map((msg, index) => (
      <div
        key={index}
        className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
            msg.senderId === userId
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none"
          }`}
        >
          <div
            className={`text-xs font-semibold mb-1 ${
              msg.senderId === userId ? "text-blue-100 text-right" : "text-gray-500"
            }`}
          >
            {msg.firstname} {msg.lastname}
          </div>
          <div>{msg.text}</div>
        </div>
      </div>
    ))}
  </div>

  {/* Input box + Send button */}
  <div className="p-4 bg-white border-t flex gap-2">
    <input
      value={newmessage}
      onChange={(e) => setnewmessage(e.target.value)}
      type="text"
      className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type a message..."
    />
    <button
      onClick={sendMessage}
      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
    >
      Send
    </button>
  </div>
</div>

    </>

  )
}

export default Chat