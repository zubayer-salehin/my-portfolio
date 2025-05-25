"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Github, Eye, Code2 } from "lucide-react";
import projectsData from "@/data/projects.json";
import projectImage1 from "@/public/suite-rents.png";
import projectImage2 from "@/public/aff-explore.png";
import projectImage3 from "@/public/flame.png";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState([]);
  const [otherVisible, setOtherVisible] = useState([]);
  const sectionRef = useRef(null);

  const featuredProjects = projectsData.projects.filter(
    (project) => project.featured
  );
  const otherProjects = projectsData.projects.filter(
    (project) => !project.featured
  );

  // Placeholder images for now - you can replace with actual project images
  const projectImages = [projectImage1, projectImage2, projectImage3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate featured projects
          featuredProjects.forEach((_, index) => {
            setTimeout(() => {
              setFeaturedVisible((prev) => [...prev, index]);
            }, index * 300);
          });

          // Animate other projects after featured ones
          setTimeout(() => {
            otherProjects.forEach((_, index) => {
              setTimeout(() => {
                setOtherVisible((prev) => [...prev, index]);
              }, index * 150);
            });
          }, featuredProjects.length * 300 + 500);
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
      id="projects"
      className="py-16 sm:py-20 px-4 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-32 right-10 w-36 h-36 bg-emerald-100 rounded-full opacity-20 transition-all duration-1000 ${
            isVisible ? "animate-pulse" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute bottom-32 left-10 w-28 h-28 bg-cyan-100 rounded-full opacity-30 transition-all duration-1000 delay-700 ${
            isVisible ? "animate-bounce" : "opacity-0"
          }`}
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 relative">
            Featured Projects
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-600 transition-all duration-700 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 sm:space-y-12 mb-12 sm:mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-800 ${
                featuredVisible.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-0 shadow-lg">
                <div
                  className={`grid lg:grid-cols-2 gap-0 ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  {/* Project Image */}
                  <div
                    className={`relative h-48 sm:h-64 lg:h-80 overflow-hidden ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                      src={projectImages[index] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Image Overlay with Icons */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                      <div className="flex space-x-4">
                        <button
                          onClick={() =>
                            window.open(
                              project.liveUrl,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                        >
                          <Eye className="h-5 w-5 text-white group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              project.githubUrl,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group/btn"
                        >
                          <Code2 className="h-5 w-5 text-white group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Project Number */}
                    <div className="absolute top-4 left-4 z-30">
                      <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white group-hover:bg-slate-50 transition-colors duration-500">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                        >
                          {project.type}
                        </Badge>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 200}ms` }}
                            ></div>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                        <Button
                          onClick={() =>
                            window.open(
                              project.liveUrl,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="group/btn hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                          Live Demo
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            window.open(
                              project.githubUrl,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="group/btn hover:scale-105 transition-all duration-300 border-2 hover:border-emerald-300"
                        >
                          <Github className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                          View Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <div
              className={`text-center mb-6 sm:mb-8 transition-all duration-800 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 relative inline-block">
                Other Projects
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-emerald-600 rounded-full"></div>
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`transition-all duration-600 ${
                    otherVisible.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group border-0 shadow-md hover:scale-105">
                    {/* Project Image */}
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Image
                        src={projectImages[index] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Quick Action Buttons */}
                      <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              window.open(
                                project.liveUrl,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                          >
                            <ExternalLink className="h-3 w-3 text-slate-700" />
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                project.githubUrl,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                          >
                            <Github className="h-3 w-3 text-slate-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4 sm:p-6 bg-white group-hover:bg-slate-50 transition-colors duration-500">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-slate-100 text-slate-700"
                          >
                            {project.type}
                          </Badge>
                        </div>

                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                          {project.title}
                        </h4>

                        <p className="text-sm sm:text-base text-slate-600 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 3).map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="text-xs hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.tech.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-3 pt-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              window.open(
                                project.liveUrl,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="flex-1 hover:scale-105 transition-transform duration-300"
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Demo
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(
                                project.githubUrl,
                                "_blank",
                                "noopener,noreferrer"
                              )
                            }
                            className="flex-1 hover:scale-105 transition-transform duration-300"
                          >
                            <Github className="mr-1 h-3 w-3" />
                            Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
