import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/Constants";
import { ArrowLeft, Send } from "lucide-react";

const Chat = () => {
  const { targetuserid } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await fetch(BASE_URL + "/chat/" + targetuserid, {
      credentials: "include",
    });
    const data = await chat.json();
    const chatMessages = data?.messages.map((msg) => ({
      senderId: msg?.senderId?._id,
      firstname: msg?.senderId?.firstname,
      lastname: msg?.senderId?.lastname,
      profileImage: msg?.senderId?.profileImage, // profile
      text: msg.text,
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstname: user.firstname,
      userId,
      targetuserid,
    });

    socket.on("messageReceiveived", ({ firstname, lastname, senderId, text, profileImage }) => {
      setMessages((prev) => [
        ...prev,
        { firstname, lastname, senderId, text, profileImage },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetuserid]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      firstname: user.firstname,
      lastname: user.lastname,
      userId,
      targetuserid,
      text: newMessage,
      profileImage: user.profileImage, // add current user image
    };

    // Optimistic update
    setMessages((prev) => [...prev, { ...msgData, senderId: userId }]);

    socketRef.current.emit("sendMessage", msgData);
    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[90vh] bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-amber-300 text-black font-semibold shadow">
        <ArrowLeft size={22} className="cursor-pointer" />
        <span className="text-lg">Chat</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === userId;
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Profile Image (left side for receiver, right side for sender) */}
              {!isSender && msg.profileImage && (
                <img
                  src={msg.profileImage}
                  alt="profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs sm:max-w-md shadow text-sm ${
                  isSender
                    ? "bg-amber-300 text-black rounded-br-none"
                    : "bg-zinc-800 text-white rounded-bl-none"
                }`}
              >
                <div
                  className={`text-[10px] mb-1 ${
                    isSender ? "text-black text-right" : "text-gray-400"
                  }`}
                >
                  {msg.firstname} {msg.lastname}
                </div>
                <div>{msg.text}</div>
              </div>
              {isSender && user?.profileImage && (
                <img
                  src={user.profileImage}
                  alt="me"
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="flex-1 border border-zinc-700 rounded-full px-4 py-2 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-amber-300 text-black px-4 py-2 rounded-full hover:bg-amber-400 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
