import React from "react";
import {  Activity, Handshake, Trees, Leaf  } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Diane from "../../assets/images/Dianne.png"
import Emma from "../../assets/images/Emma.jpg"
import Iriza from "../../assets/images/iriza.jpg"
import Innocent from "../../assets/images/Innocent.jpg"


const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
          name: "Iriza",
          role: "Project Founder",
          image: Iriza,
          bio: "Visionary behind FarmHub, driving innovation and empowering farmers through technology.",
        },

        {
          name: "Twariki",
          role: "Project Lead",
          image: "https://via.placeholder.com/150",
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
          name: "Innocent",
          role: "Backend Developer",
          image: Innocent,
          bio: "Building the robust backend systems that power FarmHub’s marketplace and diagnostics.",
        },


      ];

  return (
    <div className="flex  pt-20 flex-col min-h-screen font-serif">
        
        <main className=" flex-grow">
{/* Hero Section on the about page */}
<section 
  className="relative h-[90vh] flex items-end"
  data-aos="fade-up"
>
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80')"
    }}
  />

  {/* Gradient + Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/50 to-transparent"></div>

  {/* Logo Icon */}
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <div className="bg-green-600 p-4 rounded-full shadow-xl animate-pulse">
      <Leaf className="w-10 h-10 text-white" />
    </div>
  </div>

  <div className="relative w-full flex flex-col md:flex-row justify-between items-end px-6 md:px-16 pb-16 text-white">

    {/* Left Bottom Title */}
    <div>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
        Who we are?
      </h1>
    </div>

    {/* Right Bottom Text */}
    <p className="max-w-xl text-gray-200 leading-relaxed text-sm md:text-lg text-right mt-4 md:mt-0 drop-shadow-md">
      FarmHub brings together agronomists, engineers, and innovators committed 
      to transforming agriculture. We enable farmers with smart digital tools, 
      market access, and knowledge — building a future where farming is 
      efficient, sustainable, and community-powered.
    </p>

  </div>
</section>





{/* Mission & Vision Section */}
<section className="relative py-20 bg-green-50 overflow-hidden" data-aos="fade-up">
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-100 rounded-full opacity-50 animate-pulse-slow"></div>
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-200 rounded-full opacity-50 animate-pulse-slow"></div>

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    {/* Mission Card */}
    <div
      className="relative bg-white rounded-3xl shadow-xl p-10 transform hover:-translate-y-3 transition-transform duration-500"
      data-aos="fade-right"
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
    </div>

    {/* Vision Card */}
    <div
      className="relative bg-white rounded-3xl shadow-xl p-10 transform hover:-translate-y-3 transition-transform duration-500"
      data-aos="fade-left"
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
    </div>
  </div>
</section>

{/* our story */}
    <section className="bg-green-50 py-16" data-aos="fade-left" >

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
</section>


        {/* Services Section */}
        <section className="py-16" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-8">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className={`${service.color} rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300`}
                  data-aos="flip-up"
                >
                  <h3 className="text-xl font-semibold text-green-700 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}

<section className="relative py-20 bg-gradient-to-b from-green-50 to-white overflow-hidden" data-aos="fade-up">
  {/* Background bubbles */}
  <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-green-100 rounded-full opacity-50 animate-pulse-slow"></div>
  <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-green-200 rounded-full opacity-50 animate-pulse-slow"></div>

  <div className="max-w-6xl mx-auto px-6 text-center md:text-left relative z-10">
    <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-green-700 mb-12">
      Our Core Values
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      { values.map((value, idx) => (
        <div
          key={value.title}
          data-aos="zoom-in"
          data-aos-delay={idx * 200}
          className="
            relative bg-white/70 backdrop-blur-md border border-green-100 shadow-md
            hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
            p-6 sm:p-8 rounded-2xl
          "
        >
          <div className="absolute -top-6 -left-6 w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            {value.icon}
          </div>
          <h3 className="text-xl sm:text-xl font-semibold text-green-700 mb-3 mt-6 sm:mt-8">
            {value.title}
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{value.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-green-50" data-aos="fade-up">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-12">
      Meet the Team
    </h2>

    {/* First row: 3 cards */}
    <div className="flex flex-wrap justify-center gap-8">
      {Team.slice(0, 3).map((member) => (
        <div
          key={member.name}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-6 flex flex-col items-center text-center w-80 md:w-96"
          data-aos="zoom-in"
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
        </div>
      ))}
    </div>

    {/* Second row: 2 cards */}
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {Team.slice(3).map((member) => (
        <div
          key={member.name}
          className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 p-6 flex flex-col items-center text-center w-80 md:w-96"
          data-aos="zoom-in"
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
        </div>
      ))}
    </div>
  </div>
</section>
      </main>

    
    </div>
  );
};

export default About;