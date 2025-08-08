import React from "react";
import { useAppData } from "../contexts/AppDataContext";


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
    <div className="ml-[200px] md:ml-0 md:mt-16 px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl text-primary font-bold mb-6">Today's Food Log</h2>
      {Object.keys(meals).length === 0 ? (
        <div className="rounded bg-secondary/10 text-secondary p-6 mt-2 font-medium text-center">
          No food entries for today. Use "Add Entry" to log your meals!
        </div>
      ) : (
        Object.keys(meals).map(meal => (
          <div className="mb-8" key={meal}>
            <div className="font-semibold text-accent mb-3 text-lg">
              <span>
                {meal[0].toUpperCase() + meal.slice(1)}
                {" "}
                {meal === "breakfast" && "🥣"}
                {meal === "lunch" && "🥗"}
                {meal === "dinner" && "🍝"}
                {meal === "snack" && "🍏"}
              </span>
            </div>
            <ul>
              {meals[meal].map(entry => (
                <li key={entry.id}
                    className="flex items-center gap-4 bg-surfacelight border-b border-primary/20 rounded-lg mb-2 p-3 shadow text-white">
                  <div className="font-semibold text-primary min-w-[90px]">{entry.food}</div>
                  <div className="flex gap-3 text-secondary font-medium">
                    <span className="text-highlight font-bold">{entry.calories} kcal</span>
                    <span>P {entry.protein}g</span>
                    <span>C {entry.carbs}g</span>
                    <span>F {entry.fat}g</span>
                  </div>
                  <button
                    className="ml-auto rounded bg-highlight px-2 py-1 text-white text-sm hover:bg-amber-700 transition"
                    onClick={() => removeEntry(entry.id)}
                    title="Remove Entry"
                  >✖</button>
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
