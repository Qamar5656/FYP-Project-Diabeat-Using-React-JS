import React, { useEffect, useRef, useState } from "react"; // Import React and necessary hooks
import { Link } from "react-router-dom"; // Import Link from React Router for navigation
import Slider from "react-slick"; // Import Slider for the carousel
import "slick-carousel/slick/slick.css"; // Import Slider styles
import "slick-carousel/slick/slick-theme.css"; // Import Slider theme styles
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons for navigation
import AOS from "aos"; // Import AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Import AOS CSS for animations
import Home from "./Home"; // Import Home component
import About from "./About"; // Import About component

const Doctors = () => {
  // State for storing doctors data, loading state, and error state
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slider = useRef(null); // Reference to Slider component for controlling it

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 1000, // Duration of the animation
      once: false, // Whether the animation should trigger only once
    });

    const fetchDoctors = async () => {
      try {
        // Fetch doctors data from API
        const response = await fetch("http://localhost:8000/api/doctors/", {
          headers: {
            "Content-Type": "application/json", // Set content type header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctors"); // Throw error if response is not ok
        }
        const data = await response.json(); // Parse response as JSON
        setDoctors(data); // Update state with fetched doctors data
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        setError(err.message); // Set error state in case of an error
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchDoctors(); // Call function to fetch doctors on component mount
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    // Reinitialize AOS after doctors data is loaded
    AOS.refresh();
  }, [doctors]); // Re-run this effect whenever doctors data changes

  // Slider settings for responsive behavior and other configurations
  const settings = {
    accessibility: true, // Enable accessibility features for the slider
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop for sliding
    speed: 500, // Slide transition speed
    arrows: false, // Disable default arrows
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    responsive: [
      { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 1 } }, // 3 slides on larger screens
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } }, // 2 slides on medium screens
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // 1 slide on small screens
    ],
  };

  // Function to render star ratings for a doctor
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Full stars based on rating
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if rating is >= 0.5
    const emptyStars = 5 - fullStars - halfStar; // Empty stars to complete 5 stars
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push("★"); // Add full stars to array
    if (halfStar) stars.push("☆"); // Add half star to array if necessary
    for (let i = 0; i < emptyStars; i++) stars.push("☆"); // Add empty stars to array

    return stars.join(" "); // Join stars array into a string and return
  };

  if (loading) {
    // Show loading state if data is still being fetched
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading doctors...</p> {/* Display loading message */}
      </div>
    );
  }

  if (error) {
    // Show error state if there's an issue fetching data
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p> {/* Display error message */}
      </div>
    );
  }

  return (
    <div>
      {/* Home Component - Display home section */}
      <Home />

      {/* About Component - Display about section */}
      <About />

      {/* Doctors Section */}
      <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
        <div
          className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0"
          data-aos="fade-up" // Apply fade-up animation
        >
          <div>
            <h1
              className="text-4xl font-semibold text-center lg:text-start"
              data-aos="fade-up" // Apply fade-up animation to title
            >
              Our Doctors
            </h1>
            <p
              className="mt-2 text-center lg:text-start"
              data-aos="fade-up"
              data-aos-delay="200" // Apply delayed fade-up animation
            >
              Connect with our talented doctors
            </p>
          </div>
          <div className="flex gap-5 mt-4 lg:mt-0">
            {/* Navigation buttons for carousel */}
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickPrev()} // Navigate to previous slide
            >
              <FaArrowLeft size={25} /> {/* Left arrow icon */}
            </button>
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickNext()} // Navigate to next slide
            >
              <FaArrowRight size={25} /> {/* Right arrow icon */}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <Slider ref={slider} {...settings}> {/* Render the Slider component with settings */}
            {doctors.map((doctor) => (
              <Link
                to={`/doctor/${doctor.id}`} // Dynamic Link to doctor's detail page
                key={doctor.id}
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
                data-aos="fade-up" // Apply fade-up animation to each doctor card
                data-aos-delay="400" // Apply delayed animation for each doctor card
              >
                <div>
                  <img
                    src={doctor.profile_pic || "/src/assets/img/default-doctor.jpg"} // Display doctor's profile picture or default image
                    alt={doctor.first_name}
                    className="h-56 rounded-t-xl w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl pt-4">
                    {doctor.first_name} {doctor.last_name} {/* Doctor's full name */}
                  </h1>
                  <h3 className="pt-2">{doctor.designation}</h3> {/* Doctor's designation */}
                  {doctor.average_rating && (
                    <div className="mt-2 text-yellow-500">
                      <span>{renderStars(doctor.average_rating)}</span> {/* Render doctor's rating stars */}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Doctors; // Export Doctors component
