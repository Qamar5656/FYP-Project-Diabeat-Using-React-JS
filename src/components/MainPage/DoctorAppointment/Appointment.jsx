import React, { useState, useEffect, useRef } from 'react';

const Appointment = ({ doctorId, patientId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState('patient');
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);
  

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ws/appointments/${doctorId}/${patientId}/messages/`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        const formattedMessages = data.map((msg) => ({
          message: msg.message,
          senderType: msg.sender_type,
          createdAt: msg.created_at,
          alignment: msg.sender_type === 'patient' ? 'right' : 'left',
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // WebSocket connection
    socket.current = new WebSocket(`ws://localhost:8000/ws/appointments/${doctorId}/${patientId}/`);
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          senderType: data.sender_type,
          createdAt: data.created_at,
          alignment: data.sender_type === 'patient' ? 'right' : 'left',
        },
      ]);
    };

    return () => {
      socket.current?.close();
    };
  }, [doctorId, patientId]);

  // Scroll to bottom when messages are updated
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      message: newMessage,
      sender_type: senderType,
    };

    socket.current.send(JSON.stringify(messageData));
    setNewMessage('');
    messageInputRef.current.focus();
  };

  const handleClose = () => {
    // Refresh the page when the close button is clicked
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-[80%] md:w-[70%] lg:w-[40%] xl:w-[40%] mt-9 rounded-md shadow-lg p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-200 transition"
          onClick={handleClose}  // Trigger page reload
        >
          ✖
        </button>

        {/* Message Window */}
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.alignment === 'left' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow-md ${
                  msg.alignment === 'left' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
                }`}
              >
                <p className="text-sm">{msg.message}</p>
                
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field and Send Button */}
        <div className="flex flex-col space-y-2">
          {/* Space to enter a message */}
          <textarea
            ref={messageInputRef}
            className="w-full p-3 h-24 border border-gray-300 rounded-lg mb-4 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          {/* Send message button */}
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
