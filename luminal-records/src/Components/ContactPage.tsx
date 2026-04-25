// Components/ContactPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    inquiry: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: "",
      email: "",
      subject: "",
      inquiry: "general",
      message: "",
    });
  };

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "sync", label: "Sync & Licensing" },
    { value: "press", label: "Press & Media" },
    { value: "business", label: "Business Partnership" },
    { value: "management", label: "Artist Management" },
  ];

  const contactInfo = [
    {
      label: "General Inquiries",
      value: "info@luminalrecords.com",
      sub: "Response within 3 business days",
      icon: "📧",
    },
    {
      label: "A&R Submissions",
      value: "ar@luminalrecords.com",
      sub: "Via our demo portal only",
      icon: "🎵",
    },
    {
      label: "Press & Media",
      value: "press@luminalrecords.com",
      sub: "Media kits available on request",
      icon: "📰",
    },
    {
      label: "Office",
      value: "123 Sound Wave Blvd",
      sub: "Los Angeles, CA 90028",
      icon: "📍",
    },
  ];

  const inputClass =
    "w-full bg-white/5 rounded-xl px-5 py-4 text-white border border-white/10 focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/20";
  const inputStyle = { fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <div className="bg-[#080612] text-white min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        className="max-w-7xl mx-auto px-6 pt-24 pb-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-[11px] tracking-[0.4em] font-medium uppercase block mb-4"
            style={{
              color: "#8B5CF6",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Get In Touch
          </span>
          <h1
            className="text-7xl md:text-9xl font-bold leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Contact
          </h1>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <h2
              className="text-3xl font-bold mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              We'd love to{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                hear
              </span>{" "}
              from you.
            </h2>

            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl p-5 flex items-start space-x-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-1"
                    style={{
                      color: "#8B5CF6",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {info.label}
                  </span>
                  <p
                    className="text-white/80 font-medium mb-0.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {info.value}
                  </p>
                  <p
                    className="text-white/30 text-[12px]"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {info.sub}
                  </p>
                </div>
              </motion.div>
            ))}

            <div
              className="rounded-2xl p-6 mt-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-3"
                style={{
                  color: "#A78BFA",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Demo Submissions
              </span>
              <p
                className="text-white/50 text-sm leading-relaxed mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                All demo submissions must go through our dedicated portal. We do
                not accept unsolicited demos via email.
              </p>
              <a
                href="/demo"
                className="inline-flex items-center space-x-2 text-violet-400 hover:text-white text-[12px] font-medium transition-colors group"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span>Go to Demo Portal</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {submitted ?
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-20 text-center rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mb-8 flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    backgroundImage:
                      "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Message Received
                </h3>
                <p
                  className="text-white/40"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  We'll be in touch within 3 business days.
                </p>
              </motion.div>
            : <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2"
                      style={{
                        color: "#8B5CF6",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label
                      className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2"
                      style={{
                        color: "#8B5CF6",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2"
                    style={{
                      color: "#8B5CF6",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Inquiry Type
                  </label>
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ ...inputStyle, color: "rgba(255,255,255,0.7)" }}
                  >
                    {inquiryTypes.map((t) => (
                      <option
                        key={t.value}
                        value={t.value}
                        style={{ background: "#0d0b1e" }}
                      >
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2"
                    style={{
                      color: "#8B5CF6",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject of your message"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-2"
                    style={{
                      color: "#8B5CF6",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className={inputClass + " resize-none"}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-[14px] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 30px rgba(139,92,246,0.3)",
                  }}
                >
                  Send Message →
                </button>
              </form>
            }
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
