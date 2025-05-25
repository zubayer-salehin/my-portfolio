"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/Card";
import skillsData from "@/data/skills.json";
import * as Icons from "lucide-react";

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const sectionRef = useRef(null);

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

    return iconMap[iconName] || "Code";
  };

  const skillCategories = [
    {
      title: "Frontend",
      skills: skillsData.frontend,
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      icon: "Monitor",
      iconColor: "text-emerald-600",
      hoverIconColor: "text-emerald-700",
      skillBg: "bg-emerald-50",
      skillHoverBg: "bg-emerald-100",
      borderColor: "border-emerald-200",
    },
    {
      title: "Backend",
      skills: skillsData.backend,
      color: "cyan",
      gradient: "from-cyan-500 to-cyan-600",
      bgGradient: "from-cyan-50 to-cyan-100",
      icon: "Server",
      iconColor: "text-cyan-600",
      hoverIconColor: "text-cyan-700",
      skillBg: "bg-cyan-50",
      skillHoverBg: "bg-cyan-100",
      borderColor: "border-cyan-200",
    },
    {
      title: "Tools",
      skills: skillsData.tools,
      color: "slate",
      gradient: "from-slate-500 to-slate-600",
      bgGradient: "from-slate-50 to-slate-100",
      icon: "Wrench",
      iconColor: "text-slate-600",
      hoverIconColor: "text-slate-700",
      skillBg: "bg-slate-50",
      skillHoverBg: "bg-slate-100",
      borderColor: "border-slate-200",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger card animations
          skillCategories.forEach((_, index) => {
            setTimeout(() => {
              setCardsVisible((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
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
      id="skills"
      className="py-16 sm:py-20 px-4 bg-slate-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20 transition-all duration-1000 ${
            isVisible ? "animate-pulse" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-32 h-32 bg-cyan-100 rounded-full opacity-30 transition-all duration-1000 delay-500 ${
            isVisible ? "animate-bounce" : "opacity-0"
          }`}
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-100 rounded-full opacity-25 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-spin" : "opacity-0"
          }`}
          style={{ animationDuration: "20s" }}
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
            Skills & Technologies
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-600 transition-all duration-700 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </h2>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = Icons[category.icon];

            return (
              <div
                key={categoryIndex}
                className={`transition-all duration-800 ${
                  cardsVisible[categoryIndex]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-500 group relative overflow-hidden border-0 shadow-lg">
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  {/* Category Header */}
                  <div className="relative z-10 mb-4 sm:mb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-br ${category.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {CategoryIcon && (
                          <CategoryIcon className="h-6 w-6 text-white" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 text-center group-hover:text-slate-800 transition-colors">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3 sm:space-y-4 relative z-10">
                    {category.skills.map((skill, skillIndex) => {
                      const iconName = getSkillIcon(skill.icon);
                      const IconComponent = Icons[iconName];

                      return (
                        <div
                          key={skillIndex}
                          className={`flex items-center space-x-3 p-2 sm:p-3 rounded-lg bg-white hover:${
                            category.skillHoverBg
                          } transition-all duration-300 group/skill hover:scale-105 hover:shadow-md border border-slate-100 hover:${
                            category.borderColor
                          } ${
                            cardsVisible[categoryIndex]
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-5"
                          }`}
                          style={{
                            transitionDelay: `${
                              categoryIndex * 100 + skillIndex * 50
                            }ms`,
                          }}
                        >
                          <div className="flex-shrink-0">
                            {IconComponent && (
                              <div
                                className={`p-1.5 rounded-md ${category.skillBg} group-hover/skill:${category.skillHoverBg} transition-colors duration-300`}
                              >
                                <IconComponent
                                  className={`h-4 w-4 sm:h-5 sm:w-5 ${category.iconColor} group-hover/skill:${category.hoverIconColor} transition-colors duration-300`}
                                />
                              </div>
                            )}
                          </div>
                          <span className="text-sm sm:text-base text-slate-700 font-medium group-hover/skill:text-slate-900 transition-colors duration-300">
                            {skill.name}
                          </span>

                          {/* Skill level indicator */}
                          <div className="ml-auto opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                            <div className="flex space-x-1">
                              {[...Array(3)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    category.color === "emerald"
                                      ? "bg-emerald-400"
                                      : category.color === "cyan"
                                      ? "bg-cyan-400"
                                      : "bg-slate-400"
                                  } animate-pulse`}
                                  style={{ animationDelay: `${i * 100}ms` }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Corner Decoration */}
                  <div
                    className={`absolute top-4 right-4 w-2 h-2 rounded-full opacity-60 group-hover:animate-ping ${
                      category.color === "emerald"
                        ? "bg-emerald-400"
                        : category.color === "cyan"
                        ? "bg-cyan-400"
                        : "bg-slate-400"
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full opacity-40 group-hover:animate-ping ${
                      category.color === "emerald"
                        ? "bg-emerald-400"
                        : category.color === "cyan"
                        ? "bg-cyan-400"
                        : "bg-slate-400"
                    }`}
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Hover Border Effect */}
                  <div
                    className={`absolute inset-0 rounded-lg border-2 border-transparent group-hover:${category.borderColor} transition-all duration-300`}
                  ></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-12 sm:mt-16 text-center transition-all duration-800 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
            {[
              {
                number: skillsData.frontend.length,
                label: "Frontend",
                color: "text-emerald-600",
              },
              {
                number: skillsData.backend.length,
                label: "Backend",
                color: "text-cyan-600",
              },
              {
                number: skillsData.tools.length,
                label: "Tools",
                color: "text-slate-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}
                >
                  {stat.number}+
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
