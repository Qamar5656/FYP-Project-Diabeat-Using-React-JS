import React, { useState, useEffect, useRef } from 'react'; // Import React and necessary hooks
import DoctorDetail from './DoctorDetail'; // Import DoctorDetail component to display doctor's information

const Appointment = ({ doctorId, patientId }) => {
  // State to store messages, the new message being typed, the sender type (patient or doctor), and visibility flags
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderType, setSenderType] = useState('patient'); // Default sender type is 'patient'
  const [showDoctorDetail, setShowDoctorDetail] = useState(false); // Toggle visibility of DoctorDetail component
  const [showAppointment, setShowAppointment] = useState(true); // Toggle visibility of Appointment component
  const messageInputRef = useRef(null); // Reference to the message input field
  const messagesEndRef = useRef(null); // Reference to the end of the message list to scroll to the latest message

  // Function to handle the closing of the message window and show DoctorDetail
  const handleCloseMessages = () => {
    setShowAppointment(false); // Set to show the Appointment component when closing the message window
  };

  // WebSocket reference to establish a real-time connection
  const socket = useRef(null);

  useEffect(() => {
    // Fetch previous messages from the API when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ws/appointments/${doctorId}/${patientId}/messages/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data); // Store fetched messages in state
      } catch (error) {
        console.error('Error fetching messages:', error); // Log error if the fetch fails
      }
    };

    fetchMessages();

    // Establish WebSocket connection for real-time messaging
    socket.current = new WebSocket(`ws://localhost:8000/ws/appointments/${doctorId}/${patientId}/`);

    socket.current.onopen = () => {
      console.log('WebSocket connected'); // Log when WebSocket connection is established
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse incoming WebSocket message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          senderType: data.sender_type,
          createdAt: data.created_at,
        },
      ]); // Add the new message to the existing messages
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed'); // Log when WebSocket connection is closed
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error); // Log any WebSocket errors
    };

    return () => {
      if (socket.current) {
        socket.current.close(); // Cleanup and close WebSocket connection when component unmounts
      }
    };
  }, [doctorId, patientId]); // Re-run effect when doctorId or patientId changes

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Prevent sending empty messages

    const messageData = {
      message: newMessage,
      sender_type: senderType, // Send the message with sender type (patient or doctor)
    };

    // Send the message through the WebSocket connection
    socket.current.send(JSON.stringify(messageData));

    // Clear the input field after sending the message and focus back on it
    setNewMessage('');
    messageInputRef.current.focus();
  };

  return (
    // Appointment message portal modal
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 w-96 mt-9 rounded-md shadow-lg z-60 ">
        {/* Button to close the message window */}
        <button
          className=" text-3xl hover:text-gray-500 cursor-pointer font-bold mb-4"
          onClick={handleCloseMessages}
        >
          X {/* Close button */}
        </button>
        {/* Conditionally render DoctorDetail component if showAppointment is true */}
        {showAppointment && (
          <Appointment doctorId={doctorId} patientId={patientId} /> // Render Appointment component with doctorId and patientId as props
        )}

        <div className="h-56 overflow-y-auto mb-6">
          {/* Message window where messages are displayed */}
          <div className="flex flex-col space-y-4">
            {/* Map through messages and display each message */}
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderType === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs p-4 rounded-lg ${msg.senderType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  <p className="text-sm">{msg.message}</p> {/* Display the message */}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleString()} {/* Display message timestamp */}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll reference to automatically scroll to the latest message */}
          </div>
        </div>

        <div className="flex flex-col">
          {/* Text area for composing a new message */}
          <textarea
            ref={messageInputRef} // Reference to the text area for focusing after sending a message
            className="w-full px-3 border border-gray-300 rounded-lg h-24 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)} // Update newMessage state on change
            placeholder="Type your message..."
          />
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleSendMessage} // Trigger message send when the button is clicked
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment; // Export Appointment component