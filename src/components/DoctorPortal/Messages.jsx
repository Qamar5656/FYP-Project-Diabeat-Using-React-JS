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
  const [patientDetails, setPatientDetails] = useState(null);
  const messageInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const socket = useRef(null);
  const doctorId = localStorage.getItem('user_id');

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/patients/${patientId}/`);
      if (!response.ok) {
        throw new Error(`Error fetching patient details: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setPatientDetails(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/ws/appointments/${doctorId}/${patientId}/messages/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
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
  
  const handleCloseMessages =()=>{
    setIsMessagesVisible(false);
  }
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
    fetchPatientDetails();
  }, [patientId]);

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
    //logic to show doctor messages portal
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-4 mt-3 rounded-md shadow-lg z-60">
      {!isMessagesVisible ? (
        <>
          {patientDetails && (
            <div className="flex items-center mb-3">
              <img
                src={patientDetails.profile_pic || "/src/assets/img/default-patient.jpg"}
                alt={'...Loading Image'}
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
              />
              <div>
                <h2 className="ml-6 text-3xl font-semibold text-gray-800">
                  {`${patientDetails.first_name} ${patientDetails.last_name}`}
                </h2>
                <p className="ml-6 text-gray-500">{patientDetails.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleShowMessages}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            See Messages
          </button>
        </>
      ) : (
        <>
        <div className='w-96'>
        {/*close button to close messages */}
          <button
          className='text-black text-3xl hover:text-gray-500 cursor-pointer font-bold'
          onClick={handleCloseMessages}
          >
            X
          </button>
          {/* if message not shown then error visible*/}
          {isLoading ? (
            <p>Loading messages...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : ( 
            <div className="h-52 overflow-y-auto mb-6 space-y-4"> {/*Message window*/}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.senderType === 'patient' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs p-4 rounded-lg ${
                      msg.senderType === 'doctor'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
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
          </div>
          {/*space to enter message*/}
          <textarea
            ref={messageInputRef}
            className="w-full p-3  h-24 border border-gray-300 rounded-lg mb-4 "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          {/*send message button*/}
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
  )}  

export default PatientMessages;
