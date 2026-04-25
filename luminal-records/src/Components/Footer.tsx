// Components/Footer.tsx
import { FaInstagram, FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#050410",
        borderTop: "1px solid rgba(139,92,246,0.15)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center space-x-3 mb-8 w-fit">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                }}
              >
                <span
                  className="text-white font-black text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  LR
                </span>
              </div>
              <div>
                <div
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{
                    color: "#8B5CF6",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Est. 2020
                </div>
                <div
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  LUMINAL RECORDS
                </div>
              </div>
            </Link>
            <p
              className="text-white/30 leading-relaxed mb-8 max-w-xs text-[14px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              A Sony Music & The District label. Curating the future of music
              through artistry, vision, and craft.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: FaSpotify, href: "#", hover: "#1DB954" },
                { icon: FaInstagram, href: "#", hover: "#E1306C" },
                { icon: FaTwitter, href: "#", hover: "#1DA1F2" },
                { icon: FaYoutube, href: "#", hover: "#FF0000" },
              ].map(({ icon: Icon, href, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = hover)}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.3)")
                  }
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2 md:col-start-6">
            <h4
              className="text-[10px] tracking-[0.4em] font-semibold uppercase mb-6"
              style={{
                color: "#8B5CF6",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Discover
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Artists", path: "/artists" },
                { label: "Releases", path: "/releases" },
                { label: "Submit Demo", path: "/demo" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-white/40 hover:text-white transition-colors text-[14px] font-medium"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4
              className="text-[10px] tracking-[0.4em] font-semibold uppercase mb-6"
              style={{
                color: "#8B5CF6",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Company
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "#" },
                { label: "Terms", path: "#" },
                { label: "Licensing", path: "#" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="text-white/40 hover:text-white transition-colors text-[14px] font-medium"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4
              className="text-[10px] tracking-[0.4em] font-semibold uppercase mb-6"
              style={{
                color: "#8B5CF6",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Connect
            </h4>
            <ul
              className="space-y-3 text-white/40 text-[14px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <li>info@luminalrecords.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Los Angeles, CA</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-white/20 text-[12px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            © {new Date().getFullYear()} Luminal Records. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <span
              className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide"
              style={{
                background: "rgba(139,92,246,0.1)",
                color: "#A78BFA",
                border: "1px solid rgba(139,92,246,0.2)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              A Sony Music Company
            </span>
            <span
              className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide"
              style={{
                background: "rgba(236,72,153,0.1)",
                color: "#F472B6",
                border: "1px solid rgba(236,72,153,0.2)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              The District
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
