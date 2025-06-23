import React from "react";
import {
  RocketIcon,
  StarIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="relative bg-white dark:bg-[#111111] py-24 px-6 overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 -left-20 w-[400px] h-[400px] bg-purple-600 opacity-10 rounded-full blur-3xl z-0"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Tagline */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <RocketIcon className="h-6 w-6 text-purple-600" />
          <span className="uppercase text-sm font-semibold text-purple-600 tracking-wider">
            Take the Leap
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Ready to Supercharge{" "}
          <br className="hidden md:inline-block" />
          Your Learning Journey?
        </h2>

        {/* Subtext */}
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Join thousands of learners using ThinkStack to bring structure to self-paced
          learning. Learn smarter, track your progress, and achieve your goals faster.
        </p>

        {/* CTA Button */}
        <Button className="text-white bg-purple-600 hover:bg-purple-700 px-8 py-4 text-base sm:text-lg rounded-lg shadow-md transition">
          Start Learning Now
        </Button>

        {/* Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <Highlight
            icon={<StarIcon className="h-5 w-5 text-purple-600" />}
            title="4.9/5 Average Rating"
            desc="Loved by learners worldwide"
          />
          <Highlight
            icon={<TrendingUpIcon className="h-5 w-5 text-purple-600" />}
            title="Progress-Based Learning"
            desc="Track how much you’ve watched"
          />
          <Highlight
            icon={<ShieldCheckIcon className="h-5 w-5 text-purple-600" />}
            title="Free & Secure"
            desc="Your data stays with you"
          />
        </div>
      </div>
    </section>
  );
};

const Highlight = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  </div>
);

export default CallToAction;
