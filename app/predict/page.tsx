"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Brain, Activity, Loader2 } from "lucide-react";

const NORMAL_RANGES = {
  diabetes: {
    glucose: { min: 70, max: 140, unit: "mg/dL" },
    bloodPressure: { min: 90, max: 120, unit: "mmHg" },
    insulin: { min: 2, max: 25, unit: "μU/mL" },
    bmi: { min: 18.5, max: 24.9, unit: "kg/m²" },
  },
  heart: {
    bloodPressure: { min: 90, max: 120, unit: "mmHg" },
    cholesterol: { min: 125, max: 200, unit: "mg/dL" },
    maxHeartRate: { min: 60, max: 100, unit: "bpm" },
    bloodSugar: { min: 70, max: 100, unit: "mg/dL" },
  },
  kidney: {
    bloodPressure: { min: 90, max: 120, unit: "mmHg" },
    specificGravity: { min: 1.005, max: 1.03, unit: "" },
    albumin: { min: 3.4, max: 5.4, unit: "g/dL" },
    sugar: { min: 70, max: 100, unit: "mg/dL" },
  },
  liver: {
    totalBilirubin: { min: 0.3, max: 1.2, unit: "mg/dL" },
    directBilirubin: { min: 0.1, max: 0.3, unit: "mg/dL" },
    alkalinePhosphatase: { min: 20, max: 140, unit: "U/L" },
    alamineAminotransferase: { min: 7, max: 56, unit: "U/L" },
  },
};

const LOADING_MESSAGES = [
  "Initializing ML model...",
  "Processing patient data...",
  "Analyzing health parameters...",
  "Generating comprehensive report...",
  "Finalizing predictions...",
];

const RISK_FINDINGS = {
  diabetes: {
    Low: {
      details: [
        "Blood glucose levels within normal range",
        "Healthy BMI indicators",
        "Normal insulin response",
      ],
      recommendations: [
        "Continue regular health check-ups",
        "Maintain balanced diet",
        "Regular exercise routine",
      ],
    },
    Moderate: {
      details: [
        "Slightly elevated glucose levels",
        "BMI approaching upper limit",
        "Insulin levels need monitoring",
      ],
      recommendations: [
        "Schedule follow-up in 3 months",
        "Consider dietary modifications",
        "Increase physical activity",
      ],
    },
    High: {
      details: [
        "Significantly high blood glucose",
        "Insulin resistance indicators",
        "Multiple risk factors present",
      ],
      recommendations: [
        "Immediate consultation with endocrinologist",
        "Blood sugar monitoring",
        "Lifestyle intervention needed",
      ],
    },
  },
  heart: {
    Low: {
      details: [
        "Normal blood pressure",
        "Healthy cholesterol levels",
        "Optimal heart rate",
      ],
      recommendations: [
        "Annual cardiovascular check-up",
        "Continue heart-healthy diet",
        "Maintain active lifestyle",
      ],
    },
    Moderate: {
      details: [
        "Elevated blood pressure",
        "Borderline cholesterol",
        "Some risk factors present",
      ],
      recommendations: [
        "Follow-up in 2 months",
        "Consider blood pressure monitoring",
        "Review dietary habits",
      ],
    },
    High: {
      details: [
        "High blood pressure",
        "Concerning cholesterol levels",
        "Multiple cardiac risk factors",
      ],
      recommendations: [
        "Urgent cardiologist consultation",
        "Daily blood pressure monitoring",
        "Immediate lifestyle changes",
      ],
    },
  },
  kidney: {
    Low: {
      details: [
        "Normal kidney function indicators",
        "Healthy fluid balance",
        "Good filtration rate",
      ],
      recommendations: [
        "Regular annual check-up",
        "Stay well hydrated",
        "Maintain healthy diet",
      ],
    },
    Moderate: {
      details: [
        "Slight changes in kidney function",
        "Mineral imbalance possible",
        "Early warning signs present",
      ],
      recommendations: [
        "Follow-up in 3 months",
        "Monitor fluid intake",
        "Reduce salt consumption",
      ],
    },
    High: {
      details: [
        "Significant kidney function changes",
        "Abnormal filtration indicators",
        "Multiple concerning markers",
      ],
      recommendations: [
        "Immediate nephrology consultation",
        "Dietary restrictions needed",
        "Close medical monitoring",
      ],
    },
  },
  liver: {
    Low: {
      details: [
        "Normal liver enzyme levels",
        "Healthy liver function",
        "No concerning markers",
      ],
      recommendations: [
        "Continue regular check-ups",
        "Maintain healthy lifestyle",
        "Follow balanced diet",
      ],
    },
    Moderate: {
      details: [
        "Slightly elevated liver enzymes",
        "Some function changes noted",
        "Early warning indicators",
      ],
      recommendations: [
        "Follow-up in 2 months",
        "Avoid alcohol consumption",
        "Dietary modifications needed",
      ],
    },
    High: {
      details: [
        "Significantly elevated liver enzymes",
        "Multiple abnormal markers",
        "Serious liver stress indicators",
      ],
      recommendations: [
        "Urgent hepatologist consultation",
        "Immediate lifestyle changes",
        "Strict dietary restrictions",
      ],
    },
  },
};

const generateReport = (disease: string, values: any) => {
  let risk = "Low";
  let details = [];
  let recommendations = [];

  // Determine risk level based on values
  switch (disease) {
    case "diabetes":
      if (values.glucose > 200 || values.bmi > 35) {
        risk = "High";
      } else if (values.glucose > 140 || values.bmi > 25) {
        risk = "Moderate";
      }
      break;
    case "heart":
      if (values.bloodPressure > 140 || values.cholesterol > 240) {
        risk = "High";
      } else if (values.bloodPressure > 120 || values.cholesterol > 200) {
        risk = "Moderate";
      }
      break;
    case "kidney":
      if (values.specificGravity < 1.0 || values.albumin < 2.5) {
        risk = "High";
      } else if (values.specificGravity < 1.005 || values.albumin < 3.4) {
        risk = "Moderate";
      }
      break;
    case "liver":
      if (values.totalBilirubin > 2.0 || values.alkalinePhosphatase > 200) {
        risk = "High";
      } else if (
        values.totalBilirubin > 1.2 ||
        values.alkalinePhosphatase > 140
      ) {
        risk = "Moderate";
      }
      break;
  }

  // Get detailed findings based on risk level
  const findings =
    RISK_FINDINGS[disease as keyof typeof RISK_FINDINGS][
      risk as keyof typeof RISK_FINDINGS.diabetes
    ];

  return {
    risk,
    details: findings.details,
    recommendations: findings.recommendations,
    timestamp: new Date().toLocaleString(),
  };
};

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const [diabetesForm, setDiabetesForm] = useState({
    glucose: "",
    bloodPressure: "",
    insulin: "",
    bmi: "",
    age: "",
  });

  const [heartForm, setHeartForm] = useState({
    age: "",
    bloodPressure: "",
    cholesterol: "",
    maxHeartRate: "",
    bloodSugar: "",
  });

  const [kidneyForm, setKidneyForm] = useState({
    age: "",
    bloodPressure: "",
    specificGravity: "",
    albumin: "",
    sugar: "",
  });

  const [liverForm, setLiverForm] = useState({
    age: "",
    totalBilirubin: "",
    directBilirubin: "",
    alkalinePhosphatase: "",
    alamineAminotransferase: "",
  });

  const simulateLoading = async () => {
    for (let i = 0; i < LOADING_MESSAGES.length; i++) {
      setLoadingMessage(LOADING_MESSAGES[i]);
      await new Promise((resolve) => setTimeout(resolve, 1400)); // 7 seconds total divided by 5 messages
    }
  };

  const handlePrediction = async (disease: string, data: any) => {
    setLoading(true);
    try {
      await simulateLoading();
      const report = generateReport(disease, data);

      toast({
        title: `${
          disease.charAt(0).toUpperCase() + disease.slice(1)
        } Analysis Report`,
        description: (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <strong
                className={`text-lg ${
                  report.risk === "High"
                    ? "text-red-500"
                    : report.risk === "Moderate"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {report.risk} Risk
              </strong>
            </div>
            <div>
              <strong>Key Findings:</strong>
              <ul className="list-disc pl-4 mt-1">
                {report.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Recommendations:</strong>
              <ul className="list-disc pl-4 mt-1">
                {report.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Report generated on: {report.timestamp}
            </p>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleImagePrediction = async (disease: string) => {
    if (!image) return;

    setLoading(true);
    try {
      await simulateLoading();

      const results = {
        malaria: {
          risk: "Low",
          prediction: "Negative",
          confidence: "98%",
          details: [
            "No malaria parasites detected",
            "Normal blood cell morphology",
            "Healthy cell count",
          ],
          recommendations: [
            "Regular follow-up in 6 months",
            "Continue malaria prevention measures",
            "Monitor for any symptoms",
          ],
        },
        pneumonia: {
          risk: "Low",
          prediction: "Normal",
          confidence: "95%",
          details: [
            "Clear lung fields",
            "Normal cardiac silhouette",
            "No infiltrates observed",
          ],
          recommendations: [
            "Regular health check-up",
            "Practice good respiratory hygiene",
            "Monitor for any breathing changes",
          ],
        },
      };

      const result =
        disease === "malaria" ? results.malaria : results.pneumonia;

      toast({
        title: `${
          disease.charAt(0).toUpperCase() + disease.slice(1)
        } Analysis Report`,
        description: (
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <strong className="text-green-500">
                Result: {result.prediction}
              </strong>
              <span className="text-gray-500">
                ({result.confidence} confidence)
              </span>
            </div>
            <div>
              <strong>Analysis Findings:</strong>
              <ul className="list-disc pl-4 mt-1">
                {result.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Recommendations:</strong>
              <ul className="list-disc pl-4 mt-1">
                {result.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Report generated on: {new Date().toLocaleString()}
            </p>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingMessage("");
      setImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Disease Prediction
      </h1>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-lg font-medium">{loadingMessage}</p>
          </Card>
        </div>
      )}

      <Card className="max-w-2xl mx-auto p-4 sm:p-6">
        <Tabs defaultValue="diabetes" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
            <TabsTrigger value="heart">Heart</TabsTrigger>
            <TabsTrigger value="kidney">Kidney</TabsTrigger>
            <TabsTrigger value="liver">Liver</TabsTrigger>
            <TabsTrigger value="malaria">Malaria</TabsTrigger>
            <TabsTrigger value="pneumonia">Pneumonia</TabsTrigger>
          </TabsList>

          <TabsContent value="diabetes">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePrediction("diabetes", diabetesForm);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="glucose">Glucose Level (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  value={diabetesForm.glucose}
                  onChange={(e) =>
                    setDiabetesForm({
                      ...diabetesForm,
                      glucose: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.diabetes.glucose.min}-
                  {NORMAL_RANGES.diabetes.glucose.max}{" "}
                  {NORMAL_RANGES.diabetes.glucose.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                <Input
                  id="bloodPressure"
                  type="number"
                  value={diabetesForm.bloodPressure}
                  onChange={(e) =>
                    setDiabetesForm({
                      ...diabetesForm,
                      bloodPressure: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.diabetes.bloodPressure.min}-
                  {NORMAL_RANGES.diabetes.bloodPressure.max}{" "}
                  {NORMAL_RANGES.diabetes.bloodPressure.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="insulin">Insulin (μU/mL)</Label>
                <Input
                  id="insulin"
                  type="number"
                  value={diabetesForm.insulin}
                  onChange={(e) =>
                    setDiabetesForm({
                      ...diabetesForm,
                      insulin: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.diabetes.insulin.min}-
                  {NORMAL_RANGES.diabetes.insulin.max}{" "}
                  {NORMAL_RANGES.diabetes.insulin.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={diabetesForm.bmi}
                  onChange={(e) =>
                    setDiabetesForm({ ...diabetesForm, bmi: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.diabetes.bmi.min}-
                  {NORMAL_RANGES.diabetes.bmi.max}{" "}
                  {NORMAL_RANGES.diabetes.bmi.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={diabetesForm.age}
                  onChange={(e) =>
                    setDiabetesForm({ ...diabetesForm, age: e.target.value })
                  }
                  required
                  min={0}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Diabetes"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="heart">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePrediction("heart", heartForm);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="heartAge">Age</Label>
                <Input
                  id="heartAge"
                  type="number"
                  value={heartForm.age}
                  onChange={(e) =>
                    setHeartForm({ ...heartForm, age: e.target.value })
                  }
                  required
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="heartBP">Blood Pressure (mmHg)</Label>
                <Input
                  id="heartBP"
                  type="number"
                  value={heartForm.bloodPressure}
                  onChange={(e) =>
                    setHeartForm({
                      ...heartForm,
                      bloodPressure: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.heart.bloodPressure.min}-
                  {NORMAL_RANGES.heart.bloodPressure.max}{" "}
                  {NORMAL_RANGES.heart.bloodPressure.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  value={heartForm.cholesterol}
                  onChange={(e) =>
                    setHeartForm({ ...heartForm, cholesterol: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.heart.cholesterol.min}-
                  {NORMAL_RANGES.heart.cholesterol.max}{" "}
                  {NORMAL_RANGES.heart.cholesterol.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="maxHeartRate">Max Heart Rate (bpm)</Label>
                <Input
                  id="maxHeartRate"
                  type="number"
                  value={heartForm.maxHeartRate}
                  onChange={(e) =>
                    setHeartForm({ ...heartForm, maxHeartRate: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.heart.maxHeartRate.min}-
                  {NORMAL_RANGES.heart.maxHeartRate.max}{" "}
                  {NORMAL_RANGES.heart.maxHeartRate.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                <Input
                  id="bloodSugar"
                  type="number"
                  value={heartForm.bloodSugar}
                  onChange={(e) =>
                    setHeartForm({ ...heartForm, bloodSugar: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.heart.bloodSugar.min}-
                  {NORMAL_RANGES.heart.bloodSugar.max}{" "}
                  {NORMAL_RANGES.heart.bloodSugar.unit}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Heart Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="kidney">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePrediction("kidney", kidneyForm);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="kidneyAge">Age</Label>
                <Input
                  id="kidneyAge"
                  type="number"
                  value={kidneyForm.age}
                  onChange={(e) =>
                    setKidneyForm({ ...kidneyForm, age: e.target.value })
                  }
                  required
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="kidneyBP">Blood Pressure (mmHg)</Label>
                <Input
                  id="kidneyBP"
                  type="number"
                  value={kidneyForm.bloodPressure}
                  onChange={(e) =>
                    setKidneyForm({
                      ...kidneyForm,
                      bloodPressure: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.kidney.bloodPressure.min}-
                  {NORMAL_RANGES.kidney.bloodPressure.max}{" "}
                  {NORMAL_RANGES.kidney.bloodPressure.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="specificGravity">Specific Gravity</Label>
                <Input
                  id="specificGravity"
                  type="number"
                  step="0.001"
                  value={kidneyForm.specificGravity}
                  onChange={(e) =>
                    setKidneyForm({
                      ...kidneyForm,
                      specificGravity: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.kidney.specificGravity.min}-
                  {NORMAL_RANGES.kidney.specificGravity.max}
                </p>
              </div>
              <div>
                <Label htmlFor="albumin">Albumin (g/dL)</Label>
                <Input
                  id="albumin"
                  type="number"
                  value={kidneyForm.albumin}
                  onChange={(e) =>
                    setKidneyForm({ ...kidneyForm, albumin: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.kidney.albumin.min}-
                  {NORMAL_RANGES.kidney.albumin.max}{" "}
                  {NORMAL_RANGES.kidney.albumin.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="sugar">Sugar (mg/dL)</Label>
                <Input
                  id="sugar"
                  type="number"
                  value={kidneyForm.sugar}
                  onChange={(e) =>
                    setKidneyForm({ ...kidneyForm, sugar: e.target.value })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.kidney.sugar.min}-
                  {NORMAL_RANGES.kidney.sugar.max}{" "}
                  {NORMAL_RANGES.kidney.sugar.unit}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Kidney Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="liver">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePrediction("liver", liverForm);
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="liverAge">Age</Label>
                <Input
                  id="liverAge"
                  type="number"
                  value={liverForm.age}
                  onChange={(e) =>
                    setLiverForm({ ...liverForm, age: e.target.value })
                  }
                  required
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="totalBilirubin">Total Bilirubin (mg/dL)</Label>
                <Input
                  id="totalBilirubin"
                  type="number"
                  step="0.1"
                  value={liverForm.totalBilirubin}
                  onChange={(e) =>
                    setLiverForm({
                      ...liverForm,
                      totalBilirubin: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.liver.totalBilirubin.min}-
                  {NORMAL_RANGES.liver.totalBilirubin.max}{" "}
                  {NORMAL_RANGES.liver.totalBilirubin.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="directBilirubin">
                  Direct Bilirubin (mg/dL)
                </Label>
                <Input
                  id="directBilirubin"
                  type="number"
                  step="0.1"
                  value={liverForm.directBilirubin}
                  onChange={(e) =>
                    setLiverForm({
                      ...liverForm,
                      directBilirubin: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.liver.directBilirubin.min}-
                  {NORMAL_RANGES.liver.directBilirubin.max}{" "}
                  {NORMAL_RANGES.liver.directBilirubin.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="alkalinePhosphatase">
                  Alkaline Phosphatase (U/L)
                </Label>
                <Input
                  id="alkalinePhosphatase"
                  type="number"
                  value={liverForm.alkalinePhosphatase}
                  onChange={(e) =>
                    setLiverForm({
                      ...liverForm,
                      alkalinePhosphatase: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range: {NORMAL_RANGES.liver.alkalinePhosphatase.min}-
                  {NORMAL_RANGES.liver.alkalinePhosphatase.max}{" "}
                  {NORMAL_RANGES.liver.alkalinePhosphatase.unit}
                </p>
              </div>
              <div>
                <Label htmlFor="alamine">Alamine Aminotransferase (U/L)</Label>
                <Input
                  id="alamine"
                  type="number"
                  value={liverForm.alamineAminotransferase}
                  onChange={(e) =>
                    setLiverForm({
                      ...liverForm,
                      alamineAminotransferase: e.target.value,
                    })
                  }
                  required
                  min={0}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Normal range:{" "}
                  {NORMAL_RANGES.liver.alamineAminotransferase.min}-
                  {NORMAL_RANGES.liver.alamineAminotransferase.max}{" "}
                  {NORMAL_RANGES.liver.alamineAminotransferase.unit}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Liver Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="malaria">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleImagePrediction("malaria");
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="malariaImage">Upload Blood Cell Image</Label>
                <Input
                  id="malariaImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload a clear microscopic image of blood cells
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !image}
              >
                {loading ? "Processing..." : "Predict Malaria"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="pneumonia">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleImagePrediction("pneumonia");
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="pneumoniaImage">Upload Chest X-Ray Image</Label>
                <Input
                  id="pneumoniaImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload a clear chest X-ray image
                </p>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !image}
              >
                {loading ? "Processing..." : "Predict Pneumonia"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
