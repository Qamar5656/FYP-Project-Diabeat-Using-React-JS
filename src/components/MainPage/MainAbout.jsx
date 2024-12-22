import React from "react";
import 'animate.css';

const About = () => {
  return (
    <div className="bg-gray-900 text-white py-20 px-10">
      <h2 className="text-3xl font-bold text-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Diabeat - Your Healthy Meal Companion
      </h2>

      <p className="text-lg mb-4 animate__animated animate__fadeIn animate__delay-2s">
        Diabeat is designed to help you maintain balanced blood sugar levels by offering personalized dietary
        recommendations. With our easy-to-use Glycemic Load Calculator, you can make informed meal choices that
        align with your health goals.
      </p>

      <ul className="space-y-4">
        <li className="text-lg animate__animated animate__fadeIn animate__delay-3s">
          <strong>Personalized Meal Insights:</strong> Receive tailored recommendations based on your meal selection
          and portion size.
        </li>

        <li className="text-lg animate__animated animate__fadeIn animate__delay-4s">
          <strong>Track Blood Sugar Levels:</strong> Keep track of your blood sugar levels to ensure you're staying on top of your health.
        </li>

        <li className="text-lg animate__animated animate__zoomIn animate__delay-5s">
          <strong>Meal Recommendations:</strong> Get meal suggestions that are suited to your dietary preferences and health needs.
        </li>

        <li className="text-lg animate__animated animate__zoomIn animate__delay-6s">
          <strong>Comprehensive Meal Plan:</strong> Take the guesswork out of meal planning! With our Comprehensive Meal Plan feature, you can create a tailored 7-day meal plan with just one click.
        </li>

        <li className="text-lg animate__animated animate__fadeIn animate__delay-7s">
          <strong>Doctor Booking:</strong> Easily book appointments with certified doctors and health professionals! Whether you're seeking medical advice, a second opinion, or ongoing care, our platform allows you to schedule doctor consultations with just a few clicks.
        </li>
      </ul>

      <p className="text-lg mt-6 animate__animated animate__fadeIn animate__delay-8s">
        Whether you are newly diagnosed with diabetes or just looking to optimize your diet, Diabeat is here to help you live
        a healthier life with every meal you choose.
      </p>
    </div>
  );
};

export default About;
