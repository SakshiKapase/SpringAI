import React, { useState } from "react";

function IndianMealPlanner() {
  // ✅ States for inputs and output
  const [dietType, setDietType] = useState("vegetarian");
  const [calorieGoal, setCalorieGoal] = useState("1500 kcal/day");
  const [restrictions, setRestrictions] = useState("none");
  const [duration, setDuration] = useState("3 days");
  const [mealPlan, setMealPlan] = useState("");

  // ✅ Function to call backend API
  const generateMealPlan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/indian-meal-plan?dietType=${dietType}&calorieGoal=${encodeURIComponent(
          calorieGoal
        )}&restrictions=${encodeURIComponent(
          restrictions
        )}&duration=${encodeURIComponent(duration)}`
      );

      const data = await response.text(); // backend returns text
      console.log(data);

      setMealPlan(data); // update UI with meal plan
    } catch (error) {
      console.error("Error generating meal plan:", error);
    }
  };

  return (
    <div className="tab-content">
      <h2>Healthy Indian Meal Planner</h2>

      {/* ✅ Diet Type Input */}
      <label>Diet Type:</label>
      <select value={dietType} onChange={(e) => setDietType(e.target.value)}>
        <option value="vegetarian">Vegetarian</option>
        <option value="non-vegetarian">Non-Vegetarian</option>
        <option value="vegan">Vegan</option>
      </select>

      {/* ✅ Calorie Goal Input */}
      <label>Daily Calorie Goal:</label>
      <input
        type="text"
        value={calorieGoal}
        onChange={(e) => setCalorieGoal(e.target.value)}
        placeholder="e.g. 1500 kcal/day"
      />

      {/* ✅ Restrictions Input */}
      <label>Dietary Restrictions:</label>
      <input
        type="text"
        value={restrictions}
        onChange={(e) => setRestrictions(e.target.value)}
        placeholder="e.g. less oil, no gluten"
      />

      {/* ✅ Duration Input */}
      <label>Duration:</label>
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="e.g. 3 days, 7 days"
      />

      {/* ✅ Button */}
      <button onClick={generateMealPlan}>Generate Meal Plan</button>

      {/* ✅ Meal Plan Output */}
      <div className="output">
        <pre className="meal-plan-text">{mealPlan}</pre>
      </div>
    </div>
  );
}

export default IndianMealPlanner;
