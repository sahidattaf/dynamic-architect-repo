// Satellite Page Component with Route Integration (Public Listing with QR Access)

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const gpts = [
  { name: "Dynamic Architect", link: "https://chat.openai.com/g/g-abc123", description: "Architect AI for system optimization.", category: "Dev" },
  { name: "GPT Chain Builder", link: "https://chat.openai.com/g/g-def456", description: "Link GPTs into logic flows.", category: "Workflow" },
  // Add more GPTs here...
];

const SatellitePage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10">🌌 GPT Satellite Page</h1>
      <p className="text-center text-gray-400 mb-10">Scan, Launch, Explore. This is your AI Galaxy.</p>
      <section className="grid md:grid-cols-3 gap-6">
        {gpts.map((gpt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <Card className="bg-gray-850 border border-gray-700 rounded-2xl p-6 text-center">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{gpt.name}</h2>
                <p className="text-sm text-purple-400 mb-2">{gpt.category}</p>
                <p className="text-sm text-gray-300 mb-4">{gpt.description}</p>
                <QRCode value={gpt.link} size={128} className="mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-900 text-white text-center">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/satellite">Satellite</Link>
      </nav>
      <Routes>
        <Route path="/satellite" element={<SatellitePage />} />
        <Route path="/" element={<div className="text-center text-white mt-10 text-xl">Welcome to the Dynamic Architect Home</div>} />
      </Routes>
    </Router>
  );
};

export default App;
