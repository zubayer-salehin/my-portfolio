"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import personalData from "@/data/personal.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState([false, false, false]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger section animations
          setTimeout(
            () => setSectionsVisible((prev) => [true, prev[1], prev[2]]),
            200
          );
          setTimeout(
            () => setSectionsVisible((prev) => [prev[0], true, prev[2]]),
            400
          );
          setTimeout(
            () => setSectionsVisible((prev) => [prev[0], prev[1], true]),
            600
          );
        }
      },
      { threshold: 0.1 }
    );

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer
        ref={footerRef}
        className="bg-slate-900 text-white py-8 sm:py-12 px-4 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-10 right-10 w-32 h-32 bg-emerald-900/20 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-pulse" : "opacity-0"
            }`}
          ></div>
          <div
            className={`absolute bottom-10 left-10 w-24 h-24 bg-cyan-900/20 rounded-full transition-all duration-1000 delay-500 ${
              isVisible ? "animate-bounce" : "opacity-0"
            }`}
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-slate-800/30 rounded-full transition-all duration-1000 delay-300 ${
              isVisible ? "animate-spin" : "opacity-0"
            }`}
            style={{ animationDuration: "30s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div
              className={`sm:col-span-2 lg:col-span-1 transition-all duration-800 ${
                sectionsVisible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="group">
                <h3 className="text-lg sm:text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  {personalData.name}
                </h3>
                <p className="text-slate-300 mb-4 text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
                  Full-Stack Developer passionate about creating amazing web
                  experiences.
                </p>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: Github,
                      href: personalData.social.github,
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: personalData.social.linkedin,
                      label: "LinkedIn",
                    },
                    {
                      icon: Mail,
                      href: `mailto:${personalData.email}`,
                      label: "Email",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-slate-300 hover:text-emerald-400 transition-all duration-300 p-2 rounded-full hover:bg-slate-800 group/social hover:scale-110 ${
                        sectionsVisible[0]
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${index * 100 + 200}ms` }}
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5 group-hover/social:rotate-12 transition-transform duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className={`transition-all duration-800 ${
                sectionsVisible[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="group-hover:text-emerald-400 transition-colors duration-300">
                  Quick Links
                </span>
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
                {[
                  { name: "About", id: "about" },
                  { name: "Skills", id: "skills" },
                  { name: "Projects", id: "projects" },
                  { name: "Contact", id: "contact" },
                ].map((link, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-500 ${
                      sectionsVisible[1]
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-5"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="hover:text-emerald-400 transition-all duration-300 group/link flex items-center gap-2 py-1 hover:translate-x-2"
                    >
                      <div className="w-1 h-1 bg-slate-500 rounded-full group-hover/link:bg-emerald-400 transition-colors duration-300"></div>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className={`transition-all duration-800 ${
                sectionsVisible[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h4 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 group">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="group-hover:text-emerald-400 transition-colors duration-300">
                  Contact Info
                </span>
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm sm:text-base">
                {[
                  { text: personalData.email, type: "email" },
                  { text: personalData.phone, type: "phone" },
                  { text: personalData.location, type: "location" },
                ].map((contact, index) => (
                  <li
                    key={index}
                    className={`transition-all duration-500 hover:text-slate-200 hover:translate-x-1 group/contact ${
                      sectionsVisible[2]
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-5"
                    } ${contact.type === "email" ? "break-all" : ""}`}
                    style={{ transitionDelay: `${index * 100 + 100}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-slate-500 rounded-full group-hover/contact:bg-emerald-400 transition-colors duration-300"></div>
                      {contact.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div
            className={`border-t border-slate-700 pt-6 sm:pt-8 text-center transition-all duration-800 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-slate-300 text-sm sm:text-base flex items-center justify-center gap-2 group">
              © {currentYear} {personalData.name}. All rights reserved.
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300">
                Made with{" "}
                <Heart className="h-3 w-3 text-red-400 animate-pulse" /> and
                code
              </span>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 opacity-50"></div>
        <div
          className={`absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full transition-all duration-1000 delay-1000 ${
            isVisible ? "animate-ping" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full transition-all duration-1000 delay-1200 ${
            isVisible ? "animate-ping" : "opacity-0"
          }`}
        ></div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:scale-110 transition-all duration-300 group ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 group-hover:animate-bounce" />
      </button>
    </>
  );
}
