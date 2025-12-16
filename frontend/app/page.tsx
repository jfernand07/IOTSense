'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    temp_ambiente: 45,
    hum_ambiente: 10,
    hum_suelo: 15,
    temp_suelo: 25,
    plantId: 1,
    idealRanges: 'Temp: 18-30, HumSuelo: 40-70',
  });

  const [anomalyResult, setAnomalyResult] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [imageResult, setImageResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002') + '/ai';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAnomalies = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/detectar-anomalias`, {
        ...formData,
        // Convert strings to numbers where needed if inputs are text
        temp_ambiente: Number(formData.temp_ambiente),
        hum_ambiente: Number(formData.hum_ambiente),
        hum_suelo: Number(formData.hum_suelo),
        temp_suelo: Number(formData.temp_suelo),
        timestamp: new Date().toISOString(),
      });
      setAnomalyResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend');
    }
    setLoading(false);
  };

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/recomendaciones`, {
        ...formData,
        temp_ambiente: Number(formData.temp_ambiente),
        hum_ambiente: Number(formData.hum_ambiente),
        hum_suelo: Number(formData.hum_suelo),
        temp_suelo: Number(formData.temp_suelo),
        timestamp: new Date().toISOString(),
      });
      setRecommendations(res.data.recomendaciones || []);
    } catch (error) {
      console.error(error);
      alert('Error fetching recommendations');
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    const file = e.target.files[0];
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/analisis-imagen`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-green-700">IOTSense Dashboard</h1>
          <p className="text-gray-600">AI-Powered Plant Monitoring System</p>
        </header>

        {/* Form Section */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">1. Sensor Data Simulator</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Temp Ambiente (°C)</label>
              <input
                type="number"
                name="temp_ambiente"
                value={formData.temp_ambiente}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Humedad Ambiente (%)</label>
              <input
                type="number"
                name="hum_ambiente"
                value={formData.hum_ambiente}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Temp Suelo (°C)</label>
              <input
                type="number"
                name="temp_suelo"
                value={formData.temp_suelo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Humedad Suelo (%)</label>
              <input
                type="number"
                name="hum_suelo"
                value={formData.hum_suelo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={checkAnomalies}
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              Check Anomalies
            </button>
            <button
              onClick={getRecommendations}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Get Recommendations
            </button>
          </div>
        </section>

        {/* Results Anomaly */}
        {anomalyResult && (
          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-700 mb-2">Analysis Result</h3>
            <div className="space-y-2">
              <p><strong>Anomaly Detected:</strong> {anomalyResult.anomalia ? 'YES' : 'NO'}</p>
              <p><strong>Type:</strong> {anomalyResult.tipo}</p>
              <p><strong>Severity:</strong> {anomalyResult.severidad}/5</p>
              <p><strong>Description:</strong> {anomalyResult.descripcion}</p>
              <p><strong>Action:</strong> {anomalyResult.accion}</p>
              {anomalyResult.reanalizado && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Re-analyzed by AI</span>
              )}
            </div>
          </section>
        )}

        {/* Results Recommendations */}
        {recommendations.length > 0 && (
          <section className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Recommendations</h3>
            <ul className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="p-3 bg-blue-50 rounded-lg">
                  <span className="font-bold uppercase text-xs text-blue-600 block">{rec.tipo} (Priority: {rec.prioridad})</span>
                  {rec.mensaje}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Image Analysis */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">3. Visual Diagnosis</h2>
          <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100
          " />

          {imageResult && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h4 className="font-bold text-green-800">Diagnosis Report</h4>
              <p><strong>File:</strong> {imageResult.filename}</p>
              <p><strong>Status:</strong> {imageResult.estado}</p>
              <div>
                <strong>Possible Causes:</strong>
                <ul className="list-disc pl-5">
                  {imageResult.posibles_causas?.map((c: string, i: number) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
