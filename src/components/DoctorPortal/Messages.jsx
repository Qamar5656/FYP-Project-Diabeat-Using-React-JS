import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

const PatientMessages = () => {
  const { patientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState('doctor');
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const socket = useRef(null);

  const doctorId = localStorage.getItem('user_id')

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/ws/appointments/${doctorId}/${patientId}/messages/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched messages:', data);
      setMessages(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const connectWebSocket = () => {
    socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/appointments/${doctorId}/${patientId}/`);
    socket.current.onopen = () => {
      console.log('WebSocket connected');
    };
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message:', data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          senderType: data.sender_type,
          createdAt: data.created_at,
        },
      ]);
    };
    socket.current.onclose = () => {
      console.log('WebSocket connection closed');
    };
    socket.current.onerror = (err) => {
      console.error('WebSocket error:', err);
    };
  };

  const handleShowMessages = () => {
    fetchMessages();
    connectWebSocket();
    setIsMessagesVisible(true);
  };

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {!isMessagesVisible ? (
          <button
            onClick={handleShowMessages}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            See Messages
          </button>
        ) : (
          <>
            {isLoading ? (
              <p>Loading messages...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="h-80 overflow-y-auto mb-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.senderType === 'doctor' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-4 rounded-lg ${
                        msg.senderType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
            <textarea
              ref={messageInputRef}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientMessages;
