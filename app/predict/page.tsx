'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type PredictionResponse = {
  prediction: string;
  probability?: number;
};

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  // Form states for different diseases
  const [diabetesForm, setDiabetesForm] = useState({
    glucose: '',
    bloodPressure: '',
    insulin: '',
    bmi: '',
    age: '',
  });

  const [heartForm, setHeartForm] = useState({
    age: '',
    bloodPressure: '',
    cholesterol: '',
    maxHeartRate: '',
    bloodSugar: '',
  });

  const [kidneyForm, setKidneyForm] = useState({
    age: '',
    bloodPressure: '',
    specificGravity: '',
    albumin: '',
    sugar: '',
  });

  const [liverForm, setLiverForm] = useState({
    age: '',
    totalBilirubin: '',
    directBilirubin: '',
    alkalinePhosphatase: '',
    alamineAminotransferase: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePrediction = async (disease: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch('http://api.rahncm/prditc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          disease,
          ...data,
        }),
      });

      if (!response.ok) throw new Error('Prediction failed');

      const result: PredictionResponse = await response.json();
      toast({
        title: "Prediction Result",
        description: `${disease.charAt(0).toUpperCase() + disease.slice(1)} prediction: ${result.prediction}${result.probability ? ` (${(result.probability * 100).toFixed(2)}% probability)` : ''}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImagePrediction = async (disease: string) => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('disease', disease);

    try {
      const response = await fetch('http://api.rahncm/prditc', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');

      const result: PredictionResponse = await response.json();
      toast({
        title: "Prediction Result",
        description: `${disease.charAt(0).toUpperCase() + disease.slice(1)} prediction: ${result.prediction}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Disease Prediction</h1>
      
      <Card className="max-w-2xl mx-auto p-6">
        <Tabs defaultValue="diabetes">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
            <TabsTrigger value="heart">Heart</TabsTrigger>
            <TabsTrigger value="kidney">Kidney</TabsTrigger>
            <TabsTrigger value="liver">Liver</TabsTrigger>
            <TabsTrigger value="malaria">Malaria</TabsTrigger>
            <TabsTrigger value="pneumonia">Pneumonia</TabsTrigger>
          </TabsList>

          <TabsContent value="diabetes">
            <form onSubmit={(e) => { e.preventDefault(); handlePrediction('diabetes', diabetesForm); }} className="space-y-4">
              <div>
                <Label htmlFor="glucose">Glucose Level</Label>
                <Input
                  id="glucose"
                  type="number"
                  value={diabetesForm.glucose}
                  onChange={(e) => setDiabetesForm({...diabetesForm, glucose: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  type="number"
                  value={diabetesForm.bloodPressure}
                  onChange={(e) => setDiabetesForm({...diabetesForm, bloodPressure: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="insulin">Insulin</Label>
                <Input
                  id="insulin"
                  type="number"
                  value={diabetesForm.insulin}
                  onChange={(e) => setDiabetesForm({...diabetesForm, insulin: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={diabetesForm.bmi}
                  onChange={(e) => setDiabetesForm({...diabetesForm, bmi: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={diabetesForm.age}
                  onChange={(e) => setDiabetesForm({...diabetesForm, age: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Diabetes"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="heart">
            <form onSubmit={(e) => { e.preventDefault(); handlePrediction('heart', heartForm); }} className="space-y-4">
              <div>
                <Label htmlFor="heartAge">Age</Label>
                <Input
                  id="heartAge"
                  type="number"
                  value={heartForm.age}
                  onChange={(e) => setHeartForm({...heartForm, age: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="heartBP">Blood Pressure</Label>
                <Input
                  id="heartBP"
                  type="number"
                  value={heartForm.bloodPressure}
                  onChange={(e) => setHeartForm({...heartForm, bloodPressure: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cholesterol">Cholesterol</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  value={heartForm.cholesterol}
                  onChange={(e) => setHeartForm({...heartForm, cholesterol: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxHeartRate">Max Heart Rate</Label>
                <Input
                  id="maxHeartRate"
                  type="number"
                  value={heartForm.maxHeartRate}
                  onChange={(e) => setHeartForm({...heartForm, maxHeartRate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bloodSugar">Blood Sugar</Label>
                <Input
                  id="bloodSugar"
                  type="number"
                  value={heartForm.bloodSugar}
                  onChange={(e) => setHeartForm({...heartForm, bloodSugar: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Heart Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="kidney">
            <form onSubmit={(e) => { e.preventDefault(); handlePrediction('kidney', kidneyForm); }} className="space-y-4">
              <div>
                <Label htmlFor="kidneyAge">Age</Label>
                <Input
                  id="kidneyAge"
                  type="number"
                  value={kidneyForm.age}
                  onChange={(e) => setKidneyForm({...kidneyForm, age: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="kidneyBP">Blood Pressure</Label>
                <Input
                  id="kidneyBP"
                  type="number"
                  value={kidneyForm.bloodPressure}
                  onChange={(e) => setKidneyForm({...kidneyForm, bloodPressure: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="specificGravity">Specific Gravity</Label>
                <Input
                  id="specificGravity"
                  type="number"
                  step="0.001"
                  value={kidneyForm.specificGravity}
                  onChange={(e) => setKidneyForm({...kidneyForm, specificGravity: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="albumin">Albumin</Label>
                <Input
                  id="albumin"
                  type="number"
                  value={kidneyForm.albumin}
                  onChange={(e) => setKidneyForm({...kidneyForm, albumin: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sugar">Sugar</Label>
                <Input
                  id="sugar"
                  type="number"
                  value={kidneyForm.sugar}
                  onChange={(e) => setKidneyForm({...kidneyForm, sugar: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Kidney Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="liver">
            <form onSubmit={(e) => { e.preventDefault(); handlePrediction('liver', liverForm); }} className="space-y-4">
              <div>
                <Label htmlFor="liverAge">Age</Label>
                <Input
                  id="liverAge"
                  type="number"
                  value={liverForm.age}
                  onChange={(e) => setLiverForm({...liverForm, age: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalBilirubin">Total Bilirubin</Label>
                <Input
                  id="totalBilirubin"
                  type="number"
                  step="0.1"
                  value={liverForm.totalBilirubin}
                  onChange={(e) => setLiverForm({...liverForm, totalBilirubin: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="directBilirubin">Direct Bilirubin</Label>
                <Input
                  id="directBilirubin"
                  type="number"
                  step="0.1"
                  value={liverForm.directBilirubin}
                  onChange={(e) => setLiverForm({...liverForm, directBilirubin: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alkalinePhosphatase">Alkaline Phosphatase</Label>
                <Input
                  id="alkalinePhosphatase"
                  type="number"
                  value={liverForm.alkalinePhosphatase}
                  onChange={(e) => setLiverForm({...liverForm, alkalinePhosphatase: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alamine">Alamine Aminotransferase</Label>
                <Input
                  id="alamine"
                  type="number"
                  value={liverForm.alamineAminotransferase}
                  onChange={(e) => setLiverForm({...liverForm, alamineAminotransferase: e.target.value})}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Predict Liver Disease"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="malaria">
            <form onSubmit={(e) => { e.preventDefault(); handleImagePrediction('malaria'); }} className="space-y-4">
              <div>
                <Label htmlFor="malariaImage">Upload Blood Cell Image</Label>
                <Input
                  id="malariaImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !image}>
                {loading ? "Processing..." : "Predict Malaria"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="pneumonia">
            <form onSubmit={(e) => { e.preventDefault(); handleImagePrediction('pneumonia'); }} className="space-y-4">
              <div>
                <Label htmlFor="pneumoniaImage">Upload Chest X-Ray Image</Label>
                <Input
                  id="pneumoniaImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || !image}>
                {loading ? "Processing..." : "Predict Pneumonia"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}