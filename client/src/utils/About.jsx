import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FileText } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white dark:bg-[#1f1f1f]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          About Me
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Hi, I'm <strong>Aryan Rajendra Talekar</strong>, passionate about web development,
          building full-stack applications, and continuously learning new technologies.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.linkedin.com/in/aryanrajtalekar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaLinkedin className="text-lg" />
            LinkedIn
          </a>
          <a
            href="https://github.com/AryanRajTalekar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-800 hover:text-white transition"
          >
            <FaGithub className="text-lg" />
            GitHub
          </a>
          <a
            href="/Aryan_talekar_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
          >
            <FileText className="text-lg" />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
