import React, { useState } from "react";
import "./App.css";

import ImageGenerator from "./components/ImageGenerator";
import Chat from "./components/Chat";
import IndianMealPlanner from "./components/IndianMealPlanner"; // ✅ Import new component

function App() {
  // ✅ Active tab state
  const [activeTab, setActiveTab] = useState("image-generator");

  // ✅ Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      {/* ✅ Navigation Tabs */}
      <button
        className={activeTab === "image-generator" ? "active" : ""}
        onClick={() => handleTabChange("image-generator")}
      >
        Image Generator
      </button>

      <button
        className={activeTab === "chat" ? "active" : ""}
        onClick={() => handleTabChange("chat")}
      >
        Chat
      </button>

      

      {/* ✅ NEW TAB for Indian Meal Planner */}
      <button
        className={activeTab === "indian-meal-planner" ? "active" : ""}
        onClick={() => handleTabChange("indian-meal-planner")}
      >
        Indian Meal Planner
      </button>

      {/* ✅ Conditional Rendering */}
      <div style={{ marginTop: "20px" }}>
        {activeTab === "image-generator" && <ImageGenerator />}
        {activeTab === "chat" && <Chat />}
        {activeTab === "indian-meal-planner" && <IndianMealPlanner />} {/* ✅ New Component */}
      </div>
    </div>
  );
}

export default App;
