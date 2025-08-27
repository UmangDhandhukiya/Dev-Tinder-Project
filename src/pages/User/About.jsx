import React from "react";
import { Users, Code2, Rocket } from "lucide-react";

const About = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-20 py-16 flex items-center">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-300 mb-4">
            About DevTinder
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            DevTinder is a social platform built for developers to{" "}
            <span className="text-amber-300 font-medium">
              connect, collaborate, and innovate
            </span>
            . Whether you’re looking for teammates for{" "}
            <span className="text-amber-300">hackathons</span>, building side
            projects, or just networking within your{" "}
            <span className="text-amber-300">university</span> — DevTinder helps
            you find the right match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <Users size={40} className="text-amber-300 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold mb-2">Who We Are</h2>
            <p className="text-gray-400">
              We are developers who believe in{" "}
              <span className="text-amber-300">community-driven growth</span>.
              Our platform is designed to bring coders closer together.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <Code2 size={40} className="text-amber-300 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold mb-2">Why DevTinder?</h2>
            <p className="text-gray-400">
              Unlike traditional social platforms, DevTinder focuses on{" "}
              <span className="text-amber-300">collaboration</span>. Find
              teammates, share ideas, and build the future together.
            </p>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <Rocket size={40} className="text-amber-300 mb-4 mx-auto" />
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-400">
              To become the go-to hub for{" "}
              <span className="text-amber-300">student developers</span> and{" "}
              <span className="text-amber-300">hackathon teams</span> to find
              each other and create impactful projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
