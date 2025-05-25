"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Send,
  MessageCircle,
  User,
} from "lucide-react";
import personalData from "@/data/personal.json";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stagger form and info animations
          setTimeout(() => setFormVisible(true), 300);
          setTimeout(() => setInfoVisible(true), 600);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        toast.error(`Failed to send: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Client error:", error);
      toast.error("Message send failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-20 px-4 relative overflow-hidden"
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
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/4 w-24 h-24 bg-slate-100 rounded-full opacity-25 transition-all duration-1000 delay-300 ${
            isVisible ? "animate-spin" : "opacity-0"
          }`}
          style={{ animationDuration: "20s" }}
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
            Get In Touch
            <div
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-emerald-600 transition-all duration-700 delay-300 ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto transition-all duration-800 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            I'm always open to discussing new opportunities, interesting
            projects, or just having a chat about technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div
            className={`transition-all duration-800 ${
              formVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Card className="p-4 sm:p-6 lg:p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden text-slate-800">
              {/* Card Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-300">
                    <MessageCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors duration-300">
                    Send me a message
                  </h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div
                    className={`transition-all duration-500 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: "100ms" }}
                  >
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="group-hover:border-emerald-300 transition-colors duration-300"
                    />
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                  >
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="group-hover:border-emerald-300 transition-colors duration-300"
                    />
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="group-hover:border-emerald-300 transition-colors duration-300"
                    />
                  </div>
                  <div
                    className={`transition-all duration-500 ${
                      formVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: "400ms" }}
                  >
                    <Button
                      type="submit"
                      className="w-full group/btn hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Card Corner Decorations */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:animate-ping"></div>
              <div
                className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-40 group-hover:animate-ping"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </Card>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-800 ${
              infoVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            {/* Contact Information */}
            <div
              className={`transition-all duration-500 ${
                infoVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Phone className="h-5 w-5 text-emerald-600" />
                </div>
                Contact Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Mail, text: personalData.email, type: "email" },
                  { icon: Phone, text: personalData.phone, type: "phone" },
                  {
                    icon: MapPin,
                    text: personalData.location,
                    type: "location",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg bg-white hover:bg-emerald-50 transition-all duration-300 group/item hover:scale-105 shadow-sm hover:shadow-md ${
                      infoVisible
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-5"
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover/item:bg-emerald-200 transition-colors duration-300">
                      <item.icon className="h-5 w-5 text-emerald-600 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <span
                      className={`text-sm sm:text-base text-slate-600 group-hover/item:text-slate-900 transition-colors duration-300 ${
                        item.type === "email" ? "break-all" : ""
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div
              className={`transition-all duration-500 ${
                infoVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 flex items-center gap-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <User className="h-4 w-4 text-cyan-600" />
                </div>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {[
                  {
                    icon: Github,
                    href: personalData.social.github,
                    color: "hover:bg-gray-100",
                  },
                  {
                    icon: Linkedin,
                    href: personalData.social.linkedin,
                    color: "hover:bg-blue-100",
                  },
                  {
                    icon: Facebook,
                    href: personalData.social.facebook,
                    color: "hover:bg-blue-100",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-100 rounded-full hover:bg-emerald-100 transition-all duration-300 group/social hover:scale-110 shadow-sm hover:shadow-md ${
                      infoVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <social.icon className="h-5 w-5 text-slate-600 hover:text-emerald-600 group-hover/social:scale-110 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div
              className={`transition-all duration-500 ${
                infoVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Card className="p-4 sm:p-6 bg-emerald-50 border-emerald-200 hover:bg-emerald-100 transition-all duration-300 group/cta hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-emerald-200 rounded-lg group-hover/cta:bg-emerald-300 transition-colors duration-300">
                    <Mail className="h-4 w-4 text-emerald-700" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-900 group-hover/cta:text-emerald-800 transition-colors duration-300">
                    Let's work together!
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-slate-600 mb-4 group-hover/cta:text-slate-700 transition-colors duration-300">
                  I'm currently looking for new opportunities. Whether you have
                  a question or just want to say hi, I'll try my best to get
                  back to you!
                </p>
                <Button className="group/btn hover:scale-105 transition-all duration-300">
                  <Mail className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                  Say Hello
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
