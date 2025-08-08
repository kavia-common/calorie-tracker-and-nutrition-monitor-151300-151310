import React from "react";
import { useAppData } from "../contexts/AppDataContext";
import "../styles/FoodLog.css";

// PUBLIC_INTERFACE
function FoodLog() {
  const { todaysEntries, removeEntry } = useAppData();

  // Simple grouping by meal
  const meals = {};
  todaysEntries.forEach(e => {
    if (!meals[e.meal]) meals[e.meal] = [];
    meals[e.meal].push(e);
  });

  return (
    <div className="foodlog-container">
      <h2>Today&apos;s Food Log</h2>
      {Object.keys(meals).length === 0 ? (
        <div className="empty-log">No food entries for today. Use "Add Entry" to log your meals!</div>
      ) : (
        Object.keys(meals).map(meal => (
          <div className="meal-section" key={meal}>
            <div className="meal-title">
              <span>
                {meal[0].toUpperCase() + meal.slice(1)}
                {" "}
                {meal === "breakfast" && "🥣"}
                {meal === "lunch" && "🥗"}
                {meal === "dinner" && "🍝"}
                {meal === "snack" && "🍏"}
              </span>
            </div>
            <ul className="meal-list">
              {meals[meal].map(entry => (
                <li className="meal-item" key={entry.id}>
                  <div className="food-name">{entry.food}</div>
                  <div className="food-nutrition">
                    <span className="cals">{entry.calories} kcal</span>
                    <span>P {entry.protein}g</span>
                    <span>C {entry.carbs}g</span>
                    <span>F {entry.fat}g</span>
                  </div>
                  <button className="remove-entry" onClick={() => removeEntry(entry.id)} title="Remove Entry">✖</button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default FoodLog;
