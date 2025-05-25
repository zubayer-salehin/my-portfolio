"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Download, Mail, ChevronDown } from "lucide-react";
import personalData from "@/data/personal.json";
import PorfilePicture from "@/public/profilePicture.jpg";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Typewriter effect words
  const typewriterWords = [
    personalData.title,
    "Problem Solver",
    "Tech Enthusiast",
    "Code Creator",
  ];

  useEffect(() => {
    setIsVisible(true);

    // Typewriter effect
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 pt-16 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-cyan-100 rounded-full opacity-30 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-20 h-20 bg-emerald-200 rounded-full opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-32 w-16 h-16 bg-cyan-200 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
        {/* Text Content */}
        <div
          className={`text-center lg:text-left space-y-6 order-2 lg:order-1 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            {/* Greeting with slide-in animation */}
            <div
              className={`transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium mb-4 border border-emerald-200">
                👋 Welcome to my portfolio
              </span>
            </div>

            {/* Main heading with stagger animation */}
            <h1
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Hi, I'm{" "}
              <span className="text-emerald-600 relative">
                {personalData.name}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full transform scale-x-0 animate-[scaleX_0.8s_ease-out_1.5s_forwards]"></div>
              </span>
            </h1>

            {/* Typewriter effect for title */}
            <div
              className={`h-16 transition-all duration-700 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium">
                <span className="inline-block min-w-0">
                  {typewriterWords[currentWordIndex]}
                  <span className="animate-pulse text-emerald-600">|</span>
                </span>
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-base sm:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 transition-all duration-700 delay-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {personalData.tagline}
            </p>
          </div>

          {/* Buttons with stagger animation */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              onClick={() =>
                window.open(
                  personalData.resume,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              size="lg"
              className="group hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="group hover:scale-105 transition-all duration-200 border-2 hover:border-emerald-300"
            >
              <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Contact Me
            </Button>
          </div>
        </div>

        {/* Profile Image */}
        <div
          className={`flex justify-center lg:justify-end order-1 lg:order-2 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative group">
            {/* Main image container with hover effects */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 p-2 group-hover:scale-105 transition-all duration-500 shadow-2xl">
              <Image
                src={PorfilePicture}
                alt={personalData.name}
                width={400}
                height={400}
                className="w-full h-full rounded-full object-cover bg-white transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Floating elements with different animations */}
            <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-emerald-200 rounded-full opacity-60 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-cyan-200 rounded-full opacity-60 animate-float-delayed"></div>

            {/* Rotating ring */}
            <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 border-2 border-dashed border-emerald-300 rounded-full animate-spin-slow opacity-30"></div>

            {/* Pulsing dots */}
            <div className="absolute top-10 right-10 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            <div
              className="absolute bottom-10 left-10 w-2 h-2 bg-cyan-500 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <button
          onClick={scrollToAbout}
          className="flex flex-col items-center text-slate-400 hover:text-emerald-600 transition-colors group"
        >
          <span className="text-sm mb-2 group-hover:text-emerald-600">
            Scroll to explore
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
