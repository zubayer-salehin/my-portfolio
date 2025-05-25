"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import skillsData from "@/data/skills.json";
import personalData from "@/data/personal.json";
import * as Icons from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const sectionRef = useRef(null);

  const allSkills = [
    ...skillsData.frontend,
    ...skillsData.backend,
    ...skillsData.tools,
  ];

  // Icon mapping for better display
  const getSkillIcon = (iconName) => {
    const iconMap = {
      react: "Atom",
      triangle: "Triangle",
      code: "Code",
      code2: "Code2",
      palette: "Palette",
      wind: "Wind",
      braces: "Braces",
      server: "Server",
      zap: "Zap",
      api: "Globe",
      database: "Database",
      "git-branch": "GitBranch",
      github: "Github",
      send: "Send",
      container: "Container",
    };

    return iconMap[iconName] || iconName;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Delay skills animation
          setTimeout(() => setSkillsVisible(true), 600);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-16 sm:py-20 px-4 bg-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-10 w-32 h-32 bg-emerald-50 rounded-full opacity-30 transition-all duration-1000 ${
            isVisible ? "animate-pulse" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-32 left-10 w-24 h-24 bg-cyan-50 rounded-full opacity-40 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-bounce" : "opacity-0"
          }`}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with Animation */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 relative">
            About Me
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-600 transition-all duration-700 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content - Text */}
          <div
            className={`space-y-6 transition-all duration-800 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed relative z-10 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
                {personalData.about}
              </p>
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-lg -z-10"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center">
                <span className="w-2 h-2 bg-emerald-600 rounded-full mr-3 animate-pulse"></span>
                Quick Facts
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-slate-600">
                {[
                  { icon: "📍", text: personalData.location },
                  { icon: "📧", text: personalData.email },
                  { icon: "🎓", text: "Computer Science Student" },
                  { icon: "💼", text: "Open to opportunities" },
                ].map((fact, index) => (
                  <li
                    key={index}
                    className={`flex items-center transition-all duration-500 hover:translate-x-2 hover:text-emerald-600 group ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-200">
                      {fact.icon}
                    </span>
                    <span className={index === 1 ? "break-all" : ""}>
                      {fact.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content - Tech Stack Card */}
          <div
            className={`transition-all duration-800 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Card background animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/20 to-cyan-50/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-6 text-center relative z-10">
                <span className="relative">
                  Tech Stack
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-emerald-600 rounded-full"></div>
                </span>
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 relative z-10">
                {allSkills.slice(0, 12).map((skill, index) => {
                  const iconName = getSkillIcon(skill.icon);
                  const IconComponent = Icons[iconName];

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white hover:bg-emerald-50 transition-all duration-300 group border border-slate-100 hover:border-emerald-200 hover:shadow-md hover:scale-105 cursor-pointer ${
                        skillsVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <div className="mb-2 p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-100 transition-all duration-300 group-hover:scale-110">
                        {IconComponent ? (
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" />
                        ) : (
                          <div className="h-5 w-5 sm:h-6 sm:w-6 bg-slate-300 rounded animate-pulse"></div>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium text-center leading-tight group-hover:text-emerald-700 transition-colors duration-300">
                        {skill.name}
                      </span>

                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  );
                })}
              </div>

              {/* Show more skills indicator with animation */}
              {allSkills.length > 12 && (
                <div
                  className={`mt-4 text-center transition-all duration-500 delay-700 ${
                    skillsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                >
                  <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-600 transition-all duration-300 cursor-pointer">
                    +{allSkills.length - 12} more technologies
                  </span>
                </div>
              )}

              {/* Floating elements inside card */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
              <div
                className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-40"
                style={{ animationDelay: "1s" }}
              ></div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
