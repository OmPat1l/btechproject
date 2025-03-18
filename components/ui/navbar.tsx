"use client";
import Link from "next/link";
import { useState } from "react";
import { Stethoscope, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Dr Rahul Chinawale</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-primary">
              Home
            </Link>
            <Link href="/predict" className="text-gray-600 hover:text-primary">
              Disease Prediction
            </Link>
            <Link href="/info" className="text-gray-600 hover:text-primary">
              Disease Info
            </Link>
            <Link
              href="/appointment"
              className="text-gray-600 hover:text-primary"
            >
              Book Appointment
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/predict"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsOpen(false)}
            >
              Disease Prediction
            </Link>
            <Link
              href="/info"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsOpen(false)}
            >
              Disease Info
            </Link>
            <Link
              href="/appointment"
              className="block text-gray-600 hover:text-primary py-2"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
