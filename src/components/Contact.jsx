"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "./sub/Heading";
import { motion } from "framer-motion";

const inputBase = {
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  color: "var(--ink-1)",
  outline: "none",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  fontSize: "0.875rem",
  width: "100%",
  transition: "border-color 0.2s",
};

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [loadingMessage, setLoadingMessage] = useState({
    loading: false,
    message: "",
    success: false,
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "var(--brand-local)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "var(--border)";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData?.fullname || !formData?.email || !formData?.subject || !formData?.message) {
        setLoadingMessage({ loading: false, message: "Please fill all fields.", success: false });
        return;
      }
      setLoadingMessage({ loading: true, message: "", success: false });

      const formatData = {
        name: formData?.fullname,
        email: formData?.email,
        subject: formData?.subject,
        message: formData?.message,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formatData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const res = await response.json();

      if (res?.message) {
        setFormData({ fullname: "", email: "", subject: "", message: "" });
        setLoadingMessage({ loading: false, message: res?.message, success: true });
      } else {
        setLoadingMessage({ loading: false, message: "Failed to send message.", success: false });
      }
    } catch (error) {
      setLoadingMessage({ loading: false, message: "Failed to send message.", success: false });
      console.error("Contact form error", error);
    }
  };

  return (
    <div id="contact" className="py-20 lg:py-32">
      <Heading text={"Got Questions? I'm All Ears!👂"} />
      <div className="w-full flex lg:flex-col items-center justify-between gap-x-16 lg:gap-y-12">
        {isClient && (
          <>
            {/* Left: illustration + status */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-y-4"
            >
              <Image
                src={"/contact.gif"}
                alt="Contact illustration"
                width={380}
                height={380}
                className="w-[340px] rounded-xl opacity-85 lg:w-[260px]"
              />
              {loadingMessage?.message && (
                <p
                  className="text-sm text-center"
                  style={{ color: loadingMessage?.success ? "var(--brand-local)" : "#f87171" }}
                >
                  {loadingMessage?.message}
                </p>
              )}
            </motion.div>

            {/* Right: form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-[560px] lg:w-full flex flex-col gap-3"
            >
              <div className="flex lg:flex-col gap-3">
                <input
                  id="fullname"
                  name="fullname"
                  value={formData?.fullname}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="off"
                  type="text"
                  style={inputBase}
                  placeholder="Your Name"
                />
                <input
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="off"
                  type="email"
                  style={inputBase}
                  placeholder="Your Email"
                />
              </div>
              <input
                id="subject"
                name="subject"
                value={formData?.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
                type="text"
                style={inputBase}
                placeholder="Subject"
              />
              <textarea
                id="message"
                name="message"
                value={formData?.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={{ ...inputBase, minHeight: "140px", maxHeight: "240px", resize: "vertical" }}
                placeholder="Your message..."
              />
              <button
                type="submit"
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all duration-200"
                style={{
                  background: "var(--brand-local)",
                  color: "oklch(0.10 0.012 255)",
                  opacity: loadingMessage?.loading ? 0.7 : 1,
                  cursor: loadingMessage?.loading ? "not-allowed" : "pointer",
                }}
                disabled={loadingMessage?.loading}
              >
                {loadingMessage?.loading ? "Sending…" : "Send Message →"}
              </button>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
