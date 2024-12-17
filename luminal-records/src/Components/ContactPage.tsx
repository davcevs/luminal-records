import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 
          bg-gradient-to-r from-purple-400 to-blue-500 
          text-transparent bg-clip-text"
        >
          Contact Luminal Records
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-900 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6 text-red-500">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-2xl text-blue-500" />
                <div>
                  <p className="font-bold">Email</p>
                  <p className="text-gray-400">info@luminalrecords.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaPhone className="text-2xl text-green-500" />
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-2xl text-purple-500" />
                <div>
                  <p className="font-bold">Address</p>
                  <p className="text-gray-400">
                    123 Sound Wave Blvd, LA, CA 90028
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-red-500">
              Send Us a Message
            </h2>

            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-red-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-red-500"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={5}
                className="w-full bg-black border border-gray-800 rounded-lg p-3 focus:outline-none focus:border-red-500"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg 
                flex items-center justify-center space-x-2 
                hover:bg-red-700 transition-all"
              >
                <FaPaperPlane />
                <span>Send Message</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
