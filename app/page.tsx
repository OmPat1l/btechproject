"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Phone,
  Star,
  Calendar,
  Users,
  Award,
  MapPin,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center brightness-75"
          style={{ backgroundImage: "url('/herosection.jpeg')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="container mx-auto px-6 relative z-10 text-white text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight">
            World-Class Healthcare,<br></br> By Dr. Rahul Chinawale
          </h1>
          <div className="flex justify-center gap-6 mt-8">
            <Link
              href="https://wa.me/15551660975"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white"
              >
                WhatsApp DoctoBud
              </Button>
            </Link>
            <Link href="/predict">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-primary hover:bg-white"
              >
                Try AI Diagnosis
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold">Meet Dr. Rahul Chinawale</h2>
            <p className="text-gray-600 mt-2">
              A highly skilled and experienced physician specializing in General
              & Emergency Medicine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center"
            >
              <img
                src="/profile.png"
                alt="Dr. Rahul Chinawale"
                className="rounded-lg shadow-lg w-[70%] mx-auto"
              />
              <motion.div
                className="absolute -bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-xl flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div>
                  <h3 className="text-xl font-semibold">Dr. Rahul Chinawale</h3>
                  <p className="text-primary">
                    MBBS, Seth G.S. Medical College, Mumbai
                  </p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Information Section */}
            <div>
              <motion.p
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                With over <strong>20 years</strong> of experience, Dr. Rahul
                Chinawale has transformed lives with expert diagnosis &
                compassionate care. He has worked extensively in **emergency
                medicine, general practice, and offshore medical services**.
              </motion.p>

              {/* Achievements */}
              <motion.div
                className="mt-6 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Board Certified in Internal Medicine</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>10,000+ Patients Treated</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Available Mon-Sat, 9:00 AM - 5:00 PM</span>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+91 99309 08114</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">rahulchinawale@gmail.com</p>
                  </div>
                </div>
              </motion.div>

              {/* Book Appointment Button */}
              <motion.div className="mt-8">
                <Link href="/appointment">
                  <Button className="w-full">Book an Appointment</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <h2 className="text-4xl font-bold">Find Us</h2>
            <p className="text-gray-600">Visit our state-of-the-art clinic.</p> */}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
