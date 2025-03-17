"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Clock, Phone, Brain } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Your Health Is Our Priority
            </h1>
            <p className="text-xl mb-8">
              Advanced healthcare with a personal touch. Experience modern
              medical care with traditional values.
            </p>
            <Button size="lg" className="mr-4">
              Book Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6">
            <Stethoscope className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">General Consultation</h3>
            <p className="text-gray-600">
              Comprehensive medical checkups and consultations with our
              experienced doctors.
            </p>
          </Card>
          <Card className="p-6">
            <Brain className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Disease Prediction</h3>
            <p className="text-gray-600">
              Advanced AI-powered disease prediction system for early detection
              and prevention.
            </p>
            <Link href="/predict">
              <Button className="mt-4" variant="outline">
                Try Now
              </Button>
            </Link>
          </Card>
          <Card className="p-6">
            <Clock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Round-the-clock medical support for emergencies and urgent care
              needs.
            </p>
          </Card>
        </div>
      </section>

      {/* Doctor Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Doctor
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Doctor"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl font-semibold mb-4">
                Dr. Rahul Chinawale
              </h3>
              <p className="text-gray-600 mb-6">
                With over 15 years of experience in general medicine, Dr.
                Chinawale specializes in preventive care and chronic disease
                management. He believes in a holistic approach to healthcare and
                building long-term relationships with her patients.
              </p>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
