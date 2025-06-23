import React from "react";
import {
  RocketIcon,
  TimerIcon,
  PlayCircleIcon,
  BookOpenIcon,
  UserCheckIcon,
  GraduationCapIcon,
} from "lucide-react";

const ThinkStackIntro = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
            Empower Your Learning with{" "}
            <span className="text-purple-600">ThinkStack</span>
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            ThinkStack is a modern learning platform that brings structure to
            online education. Whether you're a student or instructor, ThinkStack
            simplifies the journey — from course creation to completion.
          </p>

          {/* Feature Highlights */}
          <div className="space-y-5">
            <Feature
              icon={<BookOpenIcon className="h-5 w-5 text-purple-600" />}
              title="All-in-One Learning Hub"
              description="Browse and watch curated educational videos with a clean course-like experience."
            />

            <Feature
              icon={<UserCheckIcon className="h-5 w-5 text-purple-600" />}
              title="Instructor Dashboard"
              description="Instructors can create, manage, and publish courses with ease."
            />
            <Feature
              icon={<TimerIcon className="h-5 w-5 text-purple-600" />}
              title="Progress Tracking"
              description="Track your watched videos, time spent, and how much is left."
            />
            <Feature
              icon={<PlayCircleIcon className="h-5 w-5 text-purple-600" />}
              title="Seamless Video Learning"
              description="Streamlined video learning interface without distractions."
            />
          </div>
        </div>

        {/* Image or Illustration */}
        <div className="w-full flex justify-center md:justify-end">
          <img
            src="./illustration.jpg"
            alt="ThinkStack UI Mockup"
            className="max-w-md w-full rounded-full shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

export default ThinkStackIntro;
