import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer({ theme }) {
  const isDark = theme === "dark";

  return (
    <footer
      className={`mt-12 border-t transition-colors duration-300 ${
        isDark
          ? "bg-gray-950 text-gray-300 border-gray-800"
          : "bg-gray-100 text-gray-700 border-gray-300"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8`}
      >
        {/* Brand & About */}
        <div>
          <h2
            className={`text-2xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            🎬 MovieBrowse
          </h2>
          <p className="text-sm leading-relaxed">
            Discover, book, and enjoy your favorite movies with ease.
            From trending blockbusters to indie gems — MovieBrowse has it all.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", link: "/" },
              { name: "Now Showing", link: "/movies" },
              { name: "My Bookings", link: "/bookings" },
              { name: "About Us", link: "/about" },
              { name: "Contact", link: "/contact" },
            ].map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  className={`transition ${
                    isDark
                      ? "hover:text-blue-400"
                      : "hover:text-blue-600 text-gray-700"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              <span>Mumbai, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-500" />
              <a
                href="mailto:support@moviebrowse.com"
                className={`transition ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                support@moviebrowse.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-blue-500" />
              <a
                href="tel:+911234567890"
                className={`transition ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                +91 12345 67890
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Follow Us
          </h3>
          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className={`transition ${
                  isDark ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
          <p
            className={`text-xs mt-4 ${
              isDark ? "text-gray-500" : "text-gray-600"
            }`}
          >
            Stay updated with the latest movies and offers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t text-center text-sm py-4 transition-colors duration-300 ${
          isDark
            ? "border-gray-800 text-gray-500"
            : "border-gray-300 text-gray-600"
        }`}
      >
        © {new Date().getFullYear()}{" "}
        <span className={isDark ? "text-white" : "text-gray-900 font-semibold"}>
          MovieBrowse
        </span>
        . All rights reserved. |{" "}
        <a
          href="/terms"
          className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
        >
          Terms
        </a>{" "}
        ·{" "}
        <a
          href="/privacy"
          className={isDark ? "hover:text-blue-400" : "hover:text-blue-600"}
        >
          Privacy
        </a>
      </div>
    </footer>
  );
}
