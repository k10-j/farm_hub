import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Activity, Handshake, Trees, Leaf } from "lucide-react";
import { animations, pulseAnimation, bubbleAnimation } from "../utils/motionConfig";

import Diane from "../../assets/images/Dianne.png"
import Emma from "../../assets/images/Emma.jpg"
import Iriza from "../../assets/images/iriza.jpg"
import Innocent from "../../assets/images/Innocent.jpg"

const About = () => {
  const services = [
    {
      title: "Pest & Disease Diagnosis",
      description:
        "Quickly identify pests and diseases affecting your crops using our diagnostic tools and expert insights. Protect your yield efficiently.",
      color: "bg-green-50",
    },
    {
      title: "Marketplace",
      description:
        "Connect with buyers and sellers of agricultural produce and equipment. Access fair prices and grow your farm business sustainably.",
      color: "bg-green-100",
    },
    {
      title: "Equipment Sharing",
      description:
        "Share and rent farm equipment with other farmers in your community, reducing costs and maximizing productivity.",
      color: "bg-green-200",
    },
  ];

  const values = [
    {
      icon: <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Empowerment",
      description: "We give farmers the digital tools, resources, and training needed to grow confidently and independently."
    },
    {
      icon: <Handshake className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Collaboration",
      description: "We build strong partnerships between farmers, experts, and the marketplace for shared agricultural success."
    },
    {
      icon: <Trees className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />,
      title: "Sustainability",
      description: "We promote eco-friendly practices and future-proof solutions that protect our land and generations ahead."
    }
  ];

  const Team = [
    {
      name: "Kate Iriza",
      role: "Project Founder",
      image: Iriza,
      bio: "Visionary behind FarmHub, driving innovation and empowering farmers through technology.",
    },
    {
      name: "Twariki Abdalaziz",
      role: "Project Lead",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Twariki",
      bio: "Coordinating the team, managing timelines, and ensuring FarmHub meets its goals.",
    },
    {
      name: "Emma Tiffany",
      role: "UI/UX Designer",
      image: Emma,
      bio: "Crafting intuitive and visually appealing designs that make FarmHub easy to use.",
    },
    {
      name: "Diane Ingabire",
      role: "Frontend Developer",
      image: Diane,
      bio: "Designing and implementing the FarmHub interface for a smooth user experience.",
    },
    {
      name: "Innocent Muvunyi",
      role: "Backend Developer",
      image: Innocent,
      bio: "Building the robust backend systems that power FarmHub's marketplace and diagnostics.",
    },
  ];

  return (
    <div className="flex pt-20 flex-col min-h-screen font-sanserif">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="relative h-[90vh] flex items-end"
          {...animations.fadeUp}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80')"
            }}
          />

          {/* Gradient + Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/50 to-transparent"></div>

          {/* Logo Icon */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <motion.div 
              className="bg-green-600 p-4 rounded-full shadow-xl"
              animate={pulseAnimation}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          <div className="relative w-full flex flex-col md:flex-row justify-between items-end px-6 md:px-16 pb-16 text-white">
            {/* Left Bottom Title */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                Who we are?
              </h1>
            </motion.div>

            {/* Right Bottom Text */}
            <motion.p 
              className="max-w-xl text-gray-200 leading-relaxed text-sm md:text-lg text-right mt-4 md:mt-0 drop-shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              FarmHub brings together agronomists, engineers, and innovators committed 
              to transforming agriculture. We enable farmers with smart digital tools, 
              market access, and knowledge — building a future where farming is 
              efficient, sustainable, and community-powered.
            </motion.p>
          </div>
        </motion.section>

        {/* Mission & Vision Section */}
        <motion.section 
          className="relative py-20 bg-green-50 overflow-hidden"
          {...animations.fadeUp}
        >
          <motion.div 
            className="absolute -top-32 -left-32 w-96 h-96 bg-green-100 rounded-full opacity-50"
            animate={bubbleAnimation}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-200 rounded-full opacity-50"
            animate={bubbleAnimation}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Mission Card */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-xl p-10"
              {...animations.fadeRight}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-8 left-10 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl shadow-lg">
                🌱
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 mt-8">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Empower farmers by providing efficient and practical tools that improve productivity, reduce losses due to pests and diseases, and foster collaboration through shared resources.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              className="relative bg-white rounded-3xl shadow-xl p-10"
              {...animations.fadeLeft}
              whileHover={{ y: -12, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-8 left-10 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-3xl shadow-lg">
                🌿
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-4 mt-8">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Connect, inform, and equip farmers to grow their farms efficiently, reduce waste, and maximize profit through a collaborative agricultural ecosystem.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Our Story */}
        <motion.section 
          className="bg-green-50 py-16"
          {...animations.fadeLeft}
        >
          <div className="max-w-6xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded with a mission to empower farmers, our journey began with the vision of combining modern digital tools with traditional agricultural practices. 
                We believe in fostering collaboration, promoting sustainability, and creating opportunities that last for generations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                From humble beginnings to growing into a platform trusted by communities, our story is rooted in innovation, care for the environment, and commitment to those who feed the world.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          className="py-16"
          {...animations.zoomIn}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8">
              What We Do
            </h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              {...animations.staggerContainer}
            >
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  className={`${service.color} rounded-lg p-6 shadow-md`}
                  {...animations.flipUp}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
                  }}
                  transition={{ delay: idx * 0.2, duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          className="relative py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden"
          {...animations.fadeUp}
        >
          {/* Background bubbles */}
          <motion.div 
            className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-green-100 rounded-full opacity-50"
            animate={bubbleAnimation}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-green-200 rounded-full opacity-50"
            animate={bubbleAnimation}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          />

          <div className="max-w-6xl mx-auto px-6 text-center md:text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-green-700 mb-12">
              Our Core Values
            </h2>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
              {...animations.staggerContainer}
            >
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  className="relative bg-white/70 backdrop-blur-md border border-green-100 shadow-md p-6 sm:p-8 rounded-2xl"
                  {...animations.zoomIn}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  }}
                  transition={{ delay: idx * 0.2, duration: 0.3 }}
                >
                  <div className="absolute -top-6 -left-6 w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-xl sm:text-xl font-semibold text-green-700 mb-3 mt-6 sm:mt-8">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="py-16 bg-green-50"
          {...animations.fadeUp}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-12">
              Meet the Team
            </h2>

            {/* First row: 3 cards */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8"
              {...animations.staggerContainer}
            >
              {Team.slice(0, 3).map((member, idx) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center w-80 md:w-96"
                  {...animations.zoomIn}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  }}
                  transition={{ delay: idx * 0.15, duration: 0.3 }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-green-300 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700">{member.name}</h3>
                  <p className="text-gray-500 mb-2">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Second row: 2 cards */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-8"
              {...animations.staggerContainer}
            >
              {Team.slice(3).map((member, idx) => (
                <motion.div
                  key={member.name}
                  className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center w-80 md:w-96"
                  {...animations.zoomIn}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)"
                  }}
                  transition={{ delay: idx * 0.15, duration: 0.3 }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-green-300 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-green-700">{member.name}</h3>
                  <p className="text-gray-500 mb-2">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default About;