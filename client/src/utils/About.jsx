import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FileText } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-[#F9FAFB] dark:bg-[#0F172A]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
          Hi, I'm <strong>Aryan Rajendra Talekar</strong>, passionate about web development,
          building full-stack applications, and continuously learning new technologies.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://www.linkedin.com/in/aryanrajtalekar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
          >
            <FaLinkedin className="text-xl" />
            LinkedIn
          </a>
          <a
            href="https://github.com/AryanRajTalekar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FaGithub className="text-xl" />
            GitHub
          </a>
          <a
            href="/Aryan_talekar_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
          >
            <FileText className="text-xl" />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
