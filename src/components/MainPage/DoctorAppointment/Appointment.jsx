import React, { useState, useEffect, useRef } from 'react';
import DoctorDetail from './DoctorDetail';

const Appointment = ({ doctorId, patientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState('patient'); // Default is 'patient'
  const [showDoctorDetail, setShowDoctorDetail] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  // Function to handle the closing of messages and show DoctorDetail
  const handleCloseMessages = ()=>{
      setShowAppointment(true); // Show DoctorDetail when the button is clicked
  }
  
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
    //doctor message portal
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 w-96 mt-9 rounded-md shadow-lg z-60">
      {/* Message Close Button */}
      <button
        className="text-black text-3xl hover:text-gray-500 cursor-pointer font-bold mb-4"
        onClick={handleCloseMessages}
      >
        X
      </button>

      {/* Conditionally render DoctorDetail component */}
{showAppointment && (
            <Appointment doctorId={id} patientId={patientId} /> // Render Appointment component with doctorId and patientId as props
          )}    
  <div className="h-56 overflow-y-auto mb-6">
  {/* Message window */}
  <div className="flex flex-col space-y-4">
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
          {/*message text area */}
          <textarea
            ref={messageInputRef}
            className="w-full px-3 border border-gray-300 rounded-lg h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
