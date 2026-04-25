// Components/DemoSubmitPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSubmissions } from "./SubmissionsContext";

const DemoSubmitPage = () => {
  const { addSubmission } = useSubmissions();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    artistName: "",
    realName: "",
    email: "",
    phone: "",
    genre: "",
    subgenre: "",
    city: "",
    country: "",
    bio: "",
    influences: "",
    demoLink: "",
    socialInstagram: "",
    socialSpotify: "",
    socialYoutube: "",
    existingReleases: "no",
    exclusiveInterest: "yes",
    heardAbout: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.artistName.trim()) newErrors.artistName = "Required";
      if (!formData.email.trim()) newErrors.email = "Required";
      if (!formData.genre) newErrors.genre = "Required";
    }
    if (step === 2) {
      if (!formData.demoLink.trim()) newErrors.demoLink = "Required";
      if (!formData.bio.trim()) newErrors.bio = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    addSubmission({ ...formData });
    setSubmitted(true);
  };

  const genres = [
    "Hip Hop",
    "R&B",
    "Pop",
    "Electronic",
    "Alternative",
    "Indie",
    "Soul",
    "Jazz",
    "Latin",
    "Afrobeat",
    "Other",
  ];

  const inputClass = (err?: string) =>
    `w-full bg-white/5 rounded-xl px-5 py-4 text-white border transition-colors focus:outline-none placeholder:text-white/20 ${
      err ?
        "border-red-500/60 focus:border-red-500"
      : "border-white/10 focus:border-violet-500"
    }`;
  const inputStyle = { fontFamily: "'Space Grotesk', sans-serif" };
  const labelClass =
    "text-[10px] tracking-[0.3em] uppercase font-medium block mb-2";
  const labelStyle = {
    color: "#8B5CF6",
    fontFamily: "'Space Grotesk', sans-serif",
  };

  const RadioGroup = ({
    options,
    value,
    onChange,
  }: {
    name: string;
    options: { v: string; l: string }[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-wrap gap-3 mt-2">
      {options.map(({ v, l }) => (
        <label
          key={v}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => onChange(v)}
        >
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
            style={{
              borderColor: value === v ? "#8B5CF6" : "rgba(255,255,255,0.2)",
              background: value === v ? "#8B5CF6" : "transparent",
            }}
          >
            {value === v && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <span
            className="text-white/60 text-[13px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {l}
          </span>
        </label>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="bg-[#080612] text-white min-h-screen flex items-center justify-center">
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg px-6"
        >
          <div
            className="w-24 h-24 rounded-3xl mx-auto mb-10 flex items-center justify-center text-4xl"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              boxShadow: "0 0 60px rgba(139,92,246,0.5)",
            }}
          >
            ✓
          </div>
          <h2
            className="text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              backgroundImage:
                "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Received
          </h2>
          <p
            className="text-white/50 leading-relaxed text-lg mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Thank you,{" "}
            <span className="text-white font-semibold">
              {formData.artistName}
            </span>
            . Your demo has been submitted successfully. Our A&R team will
            review your submission and respond within 30 days if we see a fit.
          </p>
          <span
            className="text-[11px] tracking-[0.4em] text-white/30 uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Luminal Records A&R
          </span>
        </motion.div>
      </div>
    );
  }

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
            A&R Portal
          </span>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h1
              className="text-6xl md:text-8xl font-bold leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Submit
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Demo
              </span>
            </h1>
            {/* Steps */}
            <div className="flex items-center space-x-3 pb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center space-x-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-300"
                    style={{
                      background:
                        step === s ? "linear-gradient(135deg, #8B5CF6, #EC4899)"
                        : step > s ? "rgba(139,92,246,0.3)"
                        : "rgba(255,255,255,0.08)",
                      color: step >= s ? "white" : "rgba(255,255,255,0.3)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {step > s ? "✓" : s}
                  </div>
                  {s < 3 && (
                    <div
                      className="w-10 h-0.5 rounded-full"
                      style={{
                        background:
                          step > s ?
                            "rgba(139,92,246,0.5)"
                          : "rgba(255,255,255,0.1)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Guidelines on step 1 */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 rounded-2xl p-6"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <span
              className="text-[10px] tracking-[0.4em] font-medium uppercase block mb-4"
              style={{
                color: "#A78BFA",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Submission Guidelines
            </span>
            <div
              className="grid md:grid-cols-3 gap-4 text-[14px] text-white/40"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <p>
                We accept all genres. We sign artists based on originality,
                potential, and fit with our roster.
              </p>
              <p>
                Submit your best 1–3 tracks. Links to SoundCloud, Spotify,
                YouTube, or Google Drive are accepted.
              </p>
              <p>
                Response time is 30 days maximum. If you haven't heard from us
                after 30 days, please do not resubmit.
              </p>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Step 1 — Artist Information
              </h3>

              <div className="grid md:grid-cols-2 gap-5">
                {[
                  {
                    label: "Artist / Stage Name *",
                    name: "artistName",
                    placeholder: "Your artist name",
                  },
                  {
                    label: "Real Name",
                    name: "realName",
                    placeholder: "Optional",
                  },
                  {
                    label: "Email Address *",
                    name: "email",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                  {
                    label: "Phone (Optional)",
                    name: "phone",
                    type: "tel",
                    placeholder: "+1 (555) 000-0000",
                  },
                ].map(({ label, name, type = "text", placeholder }) => (
                  <div key={name}>
                    <label className={labelClass} style={labelStyle}>
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={inputClass(errors[name])}
                      style={inputStyle}
                    />
                    {errors[name] && (
                      <p
                        className="text-red-400/70 text-[11px] mt-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}

                <div>
                  <label className={labelClass} style={labelStyle}>
                    Primary Genre *
                  </label>
                  <select
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    className={inputClass(errors.genre)}
                    style={{
                      ...inputStyle,
                      color: formData.genre ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    <option value="" style={{ background: "#0d0b1e" }}>
                      Select genre...
                    </option>
                    {genres.map((g) => (
                      <option
                        key={g}
                        value={g}
                        style={{ background: "#0d0b1e" }}
                      >
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.genre && (
                    <p
                      className="text-red-400/70 text-[11px] mt-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {errors.genre}
                    </p>
                  )}
                </div>

                {[
                  {
                    label: "Sub-Genre / Style",
                    name: "subgenre",
                    placeholder: "e.g. Trap, Neo-Soul",
                  },
                  { label: "City", name: "city", placeholder: "Los Angeles" },
                  {
                    label: "Country",
                    name: "country",
                    placeholder: "United States",
                  },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label className={labelClass} style={labelStyle}>
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={inputClass()}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  className="px-10 py-4 rounded-xl text-[13px] font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 30px rgba(139,92,246,0.3)",
                  }}
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage: "linear-gradient(90deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Step 2 — Your Music
              </h3>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Demo Link(s) *
                </label>
                <input
                  type="text"
                  name="demoLink"
                  value={formData.demoLink}
                  onChange={handleChange}
                  placeholder="SoundCloud, Spotify, YouTube, Google Drive..."
                  className={inputClass(errors.demoLink)}
                  style={inputStyle}
                />
                {errors.demoLink && (
                  <p
                    className="text-red-400/70 text-[11px] mt-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.demoLink}
                  </p>
                )}
                <p
                  className="text-white/20 text-[11px] mt-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Share up to 3 tracks. Include password if private.
                </p>
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Artist Bio *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about yourself as an artist..."
                  className={inputClass(errors.bio) + " resize-none"}
                  style={inputStyle}
                />
                {errors.bio && (
                  <p
                    className="text-red-400/70 text-[11px] mt-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {errors.bio}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Influences
                </label>
                <input
                  type="text"
                  name="influences"
                  value={formData.influences}
                  onChange={handleChange}
                  placeholder="Artists who inspire you..."
                  className={inputClass()}
                  style={inputStyle}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    label: "Instagram",
                    name: "socialInstagram",
                    placeholder: "@handle",
                  },
                  {
                    label: "Spotify Artist Link",
                    name: "socialSpotify",
                    placeholder: "URL",
                  },
                  {
                    label: "YouTube Channel",
                    name: "socialYoutube",
                    placeholder: "URL",
                  },
                ].map(({ label, name, placeholder }) => (
                  <div key={name}>
                    <label className={labelClass} style={labelStyle}>
                      {label}
                    </label>
                    <input
                      type="text"
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={inputClass()}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Do you have existing releases?
                </label>
                <RadioGroup
                  name="existingReleases"
                  options={[
                    { v: "yes", l: "Yes" },
                    { v: "no", l: "No" },
                  ]}
                  value={formData.existingReleases}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, existingReleases: v }))
                  }
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-[13px] font-medium text-white/30 hover:text-white transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  className="px-10 py-4 rounded-xl text-[13px] font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 30px rgba(139,92,246,0.3)",
                  }}
                >
                  Continue →
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.form
              key="step3"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage: "linear-gradient(90deg, #EC4899, #EF4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Step 3 — Final Details
              </h3>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Are you interested in exclusive representation?
                </label>
                <RadioGroup
                  name="exclusiveInterest"
                  options={[
                    { v: "yes", l: "Yes, exclusively" },
                    { v: "no", l: "No, non-exclusively" },
                    { v: "open", l: "Open to discuss" },
                  ]}
                  value={formData.exclusiveInterest}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, exclusiveInterest: v }))
                  }
                />
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  name="heardAbout"
                  value={formData.heardAbout}
                  onChange={handleChange}
                  placeholder="Instagram, referral, press, other..."
                  className={inputClass()}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className={labelClass} style={labelStyle}>
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Anything else you'd like us to know..."
                  className={inputClass() + " resize-none"}
                  style={inputStyle}
                />
              </div>

              {/* Summary */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-medium block mb-5"
                  style={{
                    color: "#8B5CF6",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Submission Summary
                </span>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { label: "Artist", value: formData.artistName },
                    { label: "Email", value: formData.email },
                    { label: "Genre", value: formData.genre },
                    {
                      label: "Location",
                      value: [formData.city, formData.country]
                        .filter(Boolean)
                        .join(", "),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex space-x-3">
                      <span
                        className="text-white/30 text-[12px]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.label}:
                      </span>
                      <span
                        className="text-white/70 text-[13px] font-medium"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {item.value || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="text-white/20 text-[12px] leading-relaxed"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                By submitting, you confirm that you own or have rights to the
                submitted material and agree to our privacy policy.
              </p>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[13px] font-medium text-white/30 hover:text-white transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-12 py-4 rounded-xl text-[14px] font-bold text-white transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 40px rgba(139,92,246,0.4)",
                  }}
                >
                  Submit Demo →
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DemoSubmitPage;
