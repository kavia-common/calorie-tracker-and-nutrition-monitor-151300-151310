import React from "react";
import { useAppData } from "../contexts/AppDataContext";
import "../styles/Dashboard.css";

// PUBLIC_INTERFACE
function Dashboard({ openAddEntry }) {
  const { todaysEntries, goals } = useAppData();

  // Daily totals
  const total = todaysEntries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  // Helper to pretty-format percent progress for bar
  function getPercent(val, goal) {
    if (goal && !isNaN(goal)) return Math.min(Math.round((val / goal) * 100), 100);
    return 0;
  }

  return (
    <div className="dashboard-container">
      <h1>Today's Summary</h1>
      <div className="summary-row">
        <div className="summary-card calories">
          <div className="summary-title">Calories</div>
          <div className="summary-value">
            {total.calories} / {goals.dailyCalories} kcal
          </div>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${getPercent(total.calories, goals.dailyCalories)}%`, background: "#2E86AB" }} />
          </div>
        </div>
        <div className="summary-card macros">
          <div className="summary-title">Macros</div>
          <div className="macro-row">
            <span>P {total.protein}/{goals.protein}g</span>
            <span>C {total.carbs}/{goals.carbs}g</span>
            <span>F {total.fat}/{goals.fat}g</span>
          </div>
          <div className="grid-macros">
            <div>
              <div className="macro-label">Protein</div>
              <div className="progress-bar-nutrient" style={{ background: "#6FB07F22" }}>
                <div className="progress-segment" style={{ background: "#6FB07F", width: `${getPercent(total.protein, goals.protein)}%` }} />
              </div>
            </div>
            <div>
              <div className="macro-label">Carbs</div>
              <div className="progress-bar-nutrient" style={{ background: "#2E86AB22" }}>
                <div className="progress-segment" style={{ background: "#2E86AB", width: `${getPercent(total.carbs, goals.carbs)}%` }} />
              </div>
            </div>
            <div>
              <div className="macro-label">Fat</div>
              <div className="progress-bar-nutrient" style={{ background: "#F6C85F44" }}>
                <div className="progress-segment" style={{ background: "#F6C85F", width: `${getPercent(total.fat, goals.fat)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn-large add-btn" onClick={openAddEntry}>+ Add Food Entry</button>
    </div>
  );
}

export default Dashboard;
