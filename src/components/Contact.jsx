"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Heading from "./sub/Heading";
import { motion } from "framer-motion";

const Contact = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures animations only run on the client
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData?.fullname || !formData?.email || !formData?.subject || !formData?.message) {
        console.log(formData);
        setLoadingMessage({
          loading: false,
          message: "Please fill all fields!!",
          success: false,
        });
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formatData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      if (res?.message) {
        setFormData({
          fullname: "",
          email: "",
          subject: "",
          message: "",
        });

        setLoadingMessage({
          loading: false,
          message: res?.message,
          success: true,
        });
      } else {
        setLoadingMessage({
          loading: false,
          message: "Failed to send message!",
          success: false,
        });
      }
    } catch (error) {
      setLoadingMessage({
        loading: false,
        message: "Failed to send message!",
        success: false,
      });

      console.log("Contact form error", error);
    }
  };

  return (
    <div id="contact" className="h-[80vh] py-20 lg:h-auto lg:py-40 xs:pb-20">
      <Heading text={"Got Questions? I’m All Ears!👂"}  />
      <div className="w-full h-4/6 my-auto flex lg:flex-col items-center justify-between lg:justify-center gap-x-20 lg:gap-x-0 gap-y-20">
        {isClient && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src={"/contact.gif"}
                alt="Contact Image"
                width={400}
                height={400}
                className="w-[400px] rounded-md opacity-80"
              />
            {loadingMessage?.message && <p className={`mt-[20px] text-[0.9rem] ${loadingMessage?.success ? "text-green-400" : "text-red-400"}`}>*{loadingMessage?.message}</p>}
            </motion.div>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="w-[600px] lg:w-[400px] sm:w-full flex flex-col gap-3"
            >
              <div className="w-full flex lg:flex-col gap-x-3 lg:gap-y-3">
                <input
                  id="fullname"
                  name="fullname"
                  value={formData?.fullname}
                  onChange={handleChange} 
                  autoComplete="off"
                  type="text"
                  className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none"
                  placeholder="Your Name"
                />
                <input
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange} 
                  autoComplete="off"
                  type="email"
                  className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none"
                  placeholder="Your Email"
                />
              </div>
              <input
                id="subject"
                name="subject"
                value={formData?.subject}
                onChange={handleChange} 
                autoComplete="off"
                type="text"
                className="w-full border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none"
                placeholder="Subject"
              />
              <textarea
                id="message"
                name="message"
                value={formData?.message}
                onChange={handleChange} 
                className="max-h-[250px] min-h-[150px] border border-yellow-500 rounded-md bg-zinc-100 px-4 py-2 text-sm tracking-wider text-gray-500 outline-none"
                placeholder="Write Me..."
              ></textarea>
              <button
                type="submit"
                className="w-full border border-yellow-500 rounded-md bg-yellow-600 font-light px-4 py-2 text-sm tracking-wider text-white outline-none hover:bg-yellow-500 transition-colors cursor-pointer"
              >{!loadingMessage?.loading ? "Submit" : "Sending..."}</button>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
