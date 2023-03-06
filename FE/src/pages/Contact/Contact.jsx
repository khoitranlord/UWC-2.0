import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import "../Tool/tool.css";
import ContactSection from "./ContactSection/ContactSection";

import "./contact.css";

function Contact() {
  return (
    <div className="tool">
      <div className="toolContainer">
        <Navbar />
        <div className="Contact">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default Contact;
