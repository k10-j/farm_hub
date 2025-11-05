import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BugIcon, TractorIcon, ShoppingBagIcon, ArrowRightIcon, CheckCircleIcon, StarIcon } from "lucide-react";

export function Home() {
  const features = [
    {
      icon: BugIcon,
      title: "Pest & Disease Diagnosis",
      description: "Instant crop disease detection using AI + treatment tips.",
      link: "/pest-diagnosis",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: TractorIcon,
      title: "Equipment Booking",
      description: "Rent farming equipment affordably from nearby providers.",
      link: "/equipment",
      color: "bg-amber-100 text-amber-700",
    },
    {
      icon: ShoppingBagIcon,
      title: "Marketplace",
      description: "Buy & sell farm produce directly — no middlemen.",
      link: "/marketplace",
      color: "bg-emerald-100 text-emerald-700",
    },
  ];
  const steps = [{
    number: '01',
    title: 'Sign Up',
    description: 'Create your free FarmHub account in minutes'
  }, {
    number: '02',
    title: 'Choose Service',
    description: 'Select from diagnosis, equipment, or marketplace'
  }, {
    number: '03',
    title: 'Grow Your Farm',
    description: 'Access tools and resources to increase productivity'
  }];

  const impactStats = [
    { value: "10,000+", label: "Active Farmers" },
    { value: "500+", label: "Equipment Rentals" },
    { value: "40%+", label: "Income Growth" },
  ];

  const testimonials = [{
    name: 'Jean Claude Mugisha',
    location: 'Kigali, Rwanda',
    text: 'FarmHub helped me identify a pest problem early and saved my entire maize crop. The equipment rental feature is also very affordable.',
    rating: 5
  }, {
    name: 'Marie Uwase',
    location: 'Musanze, Rwanda',
    text: 'I can now sell my vegetables directly to buyers without middlemen. My income has increased by 40% since joining FarmHub.',
    rating: 5
  }, {
    name: 'Patrick Niyonzima',
    location: 'Huye, Rwanda',
    text: 'The pest diagnosis tool is incredibly accurate. I get results within minutes and expert advice when needed.',
    rating: 5
  }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white w-full font-serif">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Empowering Farmers With{" "}
            <span className="text-green-300">Digital Innovation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-4 text-gray-200 md:text-lg"
          >
            Access AI crop diagnosis, equipment rentals & online marketplaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/auth"
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/About"
              className="px-8 py-4 border-2 border-green-400 text-green-200 rounded-lg font-semibold text-lg hover:bg-green-50 hover:text-green-700"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-10">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div
                  className={`${f.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6`}
                >
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 mb-4">{f.description}</p>
                <Link
                  to={f.link}
                  className="text-green-600 font-semibold flex items-center justify-center"
                >
                  Learn more <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => <motion.div key={step.number} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: index * 0.15
            }} viewport={{
              once: true
            }} className="relative">
              <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                <div className="text-6xl font-bold text-green-100 mb-4">
                  {step.number}
                </div>
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircleIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-300" />}
            </motion.div>)}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border"
            >
              <p className="text-4xl font-extrabold text-green-700 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-green-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
          Our Impact
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 border"
            >
              <p className="text-4xl font-extrabold text-green-700 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Farmers
            </h2>
            <p className="text-lg text-gray-600">
              See how FarmHub is transforming agriculture across Rwanda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <motion.div key={testimonial.name} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-8 shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} viewport={{
            once: true
          }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-green-50 mb-8">
              Join thousands of Rwandan farmers already using FarmHub to grow
              their success
            </p>
            <Link to="/auth" className="inline-block px-8 py-4 bg-white text-green-700 rounded-lg font-semibold text-lg hover:bg-green-50 transition-colors shadow-xl">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
