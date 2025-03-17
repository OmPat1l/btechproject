import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Dr Rahul Chinawale</span>
          </Link>
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
      </div>
    </nav>
  );
}
