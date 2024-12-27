import React, { useState, useEffect, useRef } from 'react';

const Appointment = ({ doctorId, patientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState('patient'); // Default is 'patient'
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // WebSocket connection
  const socket = useRef(null);

  useEffect(() => {
    // Fetch previous messages from the API
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ws/appointments/${doctorId}/${patientId}/messages/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Connect to the WebSocket
    socket.current = new WebSocket(`ws://localhost:8000/ws/appointments/${doctorId}/${patientId}/`);

    socket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
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

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [doctorId, patientId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      message: newMessage,
      sender_type: senderType,
    };

    // Send the message via WebSocket
    socket.current.send(JSON.stringify(messageData));

    // Clear the input field after sending the message
    setNewMessage('');
    messageInputRef.current.focus();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="h-80 overflow-y-auto mb-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderType === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-4 rounded-lg ${msg.senderType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex flex-col">
          <textarea
            ref={messageInputRef}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
