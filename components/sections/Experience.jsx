"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Building, Award } from "lucide-react";
import experienceData from "@/data/experience.json";

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate experience cards one by one
          experienceData.experiences.forEach((_, index) => {
            setTimeout(() => {
              setCardsVisible((prev) => [...prev, index]);
            }, index * 200);
          });
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
      id="experience"
      className="py-16 sm:py-20 px-4 bg-slate-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 transition-all duration-1000 ${
            isVisible ? "animate-pulse" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-32 left-10 w-24 h-24 bg-cyan-100 rounded-full opacity-30 transition-all duration-1000 delay-500 ${
            isVisible ? "animate-bounce" : "opacity-0"
          }`}
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-16 h-16 bg-slate-100 rounded-full opacity-25 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-spin" : "opacity-0"
          }`}
          style={{ animationDuration: "15s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 relative">
            Experience
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-600 transition-all duration-700 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-slate-300 h-full"></div>

          <div className="space-y-6 sm:space-y-8">
            {experienceData.experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`transition-all duration-800 ${
                  cardsVisible.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {/* Timeline Dot - Desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                    <div
                      className={`w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${
                        cardsVisible.includes(index) ? "scale-100" : "scale-0"
                      }`}
                      style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    ></div>
                  </div>

                  {/* Experience Card */}
                  <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-500 group relative overflow-hidden border-0 shadow-lg">
                    {/* Card Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="flex flex-col md:flex-row md:items-start gap-4 relative z-10">
                      <div className="flex-1">
                        <div className="space-y-3 sm:space-y-4">
                          {/* Header Section */}
                          <div className="space-y-2">
                            <div className="flex items-start justify-between flex-wrap gap-2">
                              <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                                  {experience.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Building className="h-4 w-4 text-emerald-600" />
                                  <p className="text-base sm:text-lg text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors duration-300">
                                    {experience.company}
                                  </p>
                                </div>
                              </div>

                              {/* Experience Number */}
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                  {index + 1}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Duration */}
                          <div className="flex items-center gap-4 text-slate-600">
                            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full group-hover:bg-emerald-100 transition-colors duration-300">
                              <Calendar className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm font-medium">
                                {experience.duration}
                              </span>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="relative">
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                              {experience.description}
                            </p>
                            <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Technologies */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm font-medium text-slate-700">
                                Technologies Used:
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map(
                                (tech, techIndex) => (
                                  <Badge
                                    key={techIndex}
                                    variant="outline"
                                    className={`hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300 cursor-default ${
                                      cardsVisible.includes(index)
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2"
                                    }`}
                                    style={{
                                      transitionDelay: `${
                                        index * 100 + techIndex * 50 + 400
                                      }ms`,
                                    }}
                                  >
                                    {tech}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Connector - Mobile */}
                      <div className="md:hidden flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                        <div className="text-xs text-slate-500 font-medium">
                          {index === 0
                            ? "Latest"
                            : index === experienceData.experiences.length - 1
                            ? "First"
                            : "Previous"}
                        </div>
                      </div>
                    </div>

                    {/* Card Corner Decorations */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:animate-ping"></div>
                    <div
                      className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 group-hover:animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-emerald-200 transition-all duration-300"></div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Summary */}
        <div
          className={`mt-12 sm:mt-16 text-center transition-all duration-800 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                4+
              </div>
              <div className="text-sm text-slate-600">Experiences</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">
                2+
              </div>
              <div className="text-sm text-slate-600">Years</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-slate-600 mb-1">
                10+
              </div>
              <div className="text-sm text-slate-600">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
