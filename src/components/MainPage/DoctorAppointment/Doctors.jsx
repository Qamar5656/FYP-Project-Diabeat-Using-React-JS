import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Home from "./Home";
import About from "./About";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slider = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Allow animations to re-trigger on scroll
    });

    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/doctors/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Reinitialize AOS after doctors are loaded
    AOS.refresh();
  }, [doctors]);

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1023, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push("★"); // Full stars
    if (halfStar) stars.push("☆"); // Half star
    for (let i = 0; i < emptyStars; i++) stars.push("☆"); // Empty stars

    return stars.join(" ");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Home Component */}
      <Home />

      <About />

      {/* Doctors Section */}
      <div className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-16">
        <div
          className="flex flex-col items-center lg:flex-row justify-between mb-10 lg:mb-0"
          data-aos="fade-up"
        >
          <div>
            <h1
              className="text-4xl font-semibold text-center lg:text-start"
              data-aos="fade-up"
            >
              Our Doctors
            </h1>
            <p
              className="mt-2 text-center lg:text-start"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Connect with our talented doctors
            </p>
          </div>
          <div className="flex gap-5 mt-4 lg:mt-0">
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickPrev()}
            >
              <FaArrowLeft size={25} />
            </button>
            <button
              className="bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]"
              onClick={() => slider.current.slickNext()}
            >
              <FaArrowRight size={25} />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <Slider ref={slider} {...settings}>
            {doctors.map((doctor) => (
              <Link
                to={`/doctor/${doctor.id}`} // Dynamic Link
                key={doctor.id}
                className="h-[350px] text-black rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-2 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div>
                  <img
                    src={doctor.profile_pic || "/src/assets/img/default-doctor.jpg"}
                    alt={doctor.first_name}
                    className="h-56 rounded-t-xl w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl pt-4">
                    {doctor.first_name} {doctor.last_name}
                  </h1>
                  <h3 className="pt-2">{doctor.designation}</h3>
                  {doctor.average_rating && (
                    <div className="mt-2 text-yellow-500">
                      <span>{renderStars(doctor.average_rating)}</span>
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

export default Doctors;
