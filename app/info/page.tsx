'use client';

import { Card } from "@/components/ui/card";
import { Brain, Heart, LucideKey as Kidney, Activity, Microscope, Settings as Lungs } from "lucide-react";

const diseases = [
  {
    name: "Diabetes",
    icon: Activity,
    description: "A chronic disease that affects how your body turns food into energy. The body either doesn't make enough insulin or can't use it as well as it should.",
    mlModel: "Random Forest Classifier",
    accuracy: "85%",
    parameters: ["Glucose Level", "Blood Pressure", "Insulin", "BMI", "Age"],
  },
  {
    name: "Heart Disease",
    icon: Heart,
    description: "Conditions that affect the heart's structure and function. Common risk factors include high blood pressure, high cholesterol, and smoking.",
    mlModel: "Support Vector Machine",
    accuracy: "88%",
    parameters: ["Age", "Blood Pressure", "Cholesterol", "Max Heart Rate", "Blood Sugar"],
  },
  {
    name: "Kidney Disease",
    icon: Kidney,
    description: "A condition that impairs kidney function. Early detection through specific markers can help prevent progression to kidney failure.",
    mlModel: "Gradient Boosting",
    accuracy: "87%",
    parameters: ["Age", "Blood Pressure", "Specific Gravity", "Albumin", "Sugar"],
  },
  {
    name: "Liver Disease",
    icon: Activity,
    description: "Various conditions that affect liver function. Early detection through blood tests can help identify liver problems before they become severe.",
    mlModel: "XGBoost",
    accuracy: "86%",
    parameters: ["Age", "Total Bilirubin", "Direct Bilirubin", "Alkaline Phosphatase", "Alamine Aminotransferase"],
  },
  {
    name: "Malaria",
    icon: Microscope,
    description: "A serious disease caused by parasites that infect red blood cells. Detection through blood cell image analysis can provide quick diagnosis.",
    mlModel: "Convolutional Neural Network",
    accuracy: "94%",
    parameters: ["Blood Cell Images"],
  },
  {
    name: "Pneumonia",
    icon: Lungs,
    description: "An infection that inflames the air sacs in the lungs. Early detection through chest X-ray analysis can lead to better treatment outcomes.",
    mlModel: "Deep Learning CNN",
    accuracy: "92%",
    parameters: ["Chest X-Ray Images"],
  },
];

export default function InfoPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Disease Information & ML Models</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {diseases.map((disease) => (
          <Card key={disease.name} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <disease.icon className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold">{disease.name}</h2>
            </div>
            <p className="text-gray-600 mb-4">{disease.description}</p>
            <div className="space-y-2">
              <p><strong>ML Model:</strong> {disease.mlModel}</p>
              <p><strong>Accuracy:</strong> {disease.accuracy}</p>
              <div>
                <strong>Parameters:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  {disease.parameters.map((param) => (
                    <li key={param} className="text-gray-600">{param}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}