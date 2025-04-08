"use client";

import Nav from "@/components/ui/nav";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Nav />

      <main className="flex-1 px-4 md:px-8 py-12">
        <div className="mb-16">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
            Contact
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl">
            Have a project in mind or want to discuss a potential collaboration?
            Feel free to reach out through any of the channels below or use the
            contact form.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-xl font-medium mb-6 tracking-tight">
              Connect With Me
            </h2>

            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                <Link
                  href="mailto:ruslan.mukhamedvaleev@gmail.com"
                  className="hover:underline"
                >
                  ruslan.mukhamedvaleev@gmail.com
                </Link>
              </div>

              <div className="flex items-center">
                <Linkedin className="h-5 w-5 mr-3" />
                <Link
                  href="https://www.linkedin.com/in/ruslan-muk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center"
                >
                  linkedin.com/in/ruslan-muk
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="flex items-center">
                <Github className="h-5 w-5 mr-3" />
                <Link
                  href="https://github.com/digitalRM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center"
                >
                  github.com/digitalRM
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>

              <div className="flex items-center">
                <Twitter className="h-5 w-5 mr-3" />
                <Link
                  href="https://x.com/mukhamedvaleev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center"
                >
                  x.com/mukhamedvaleev
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-medium mb-6 tracking-tight">
                More Links
              </h2>

              <div className="space-y-4">
                <div>
                  <Link
                    href="https://www.behance.net/mukhamedvaleev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    Behance Portfolio
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <Link
                    href="https://dribbble.com/RuslanMukhamedvaleev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    Dribbble Shots
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>

                <div>
                  <Link
                    href="https://builders.mozilla.org/profile/ruslan-mukhamedvaleev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    Mozilla Builders Profile
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-6 tracking-tight">
              Get In Touch
            </h2>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full border border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="border border-black bg-black text-white py-3 px-6 hover:bg-white hover:text-black transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="px-4 md:px-8 py-6 border-t border-neutral-200">
        <div className="flex justify-between items-center">
          <div className="text-xs text-neutral-500">
            New York{" "}
            {new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
          <div className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Ruslan Mukhamedvaleev
          </div>
        </div>
      </footer>
    </div>
  );
}
