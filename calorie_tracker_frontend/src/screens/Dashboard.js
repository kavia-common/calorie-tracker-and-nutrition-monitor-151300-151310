import React from "react";
import { useAppData } from "../contexts/AppDataContext";


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
    <div className="ml-[200px] md:ml-0 md:mt-16 px-4 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8 drop-shadow">Today's Summary</h1>
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Calories Card */}
        <div className="flex-1 min-w-[240px] rounded-2xl bg-surfacelight dark:bg-surfacelight border border-primary/60 p-6 shadow-md">
          <div className="text-secondary font-semibold mb-3">Calories</div>
          <div className="text-2xl font-bold text-primary mb-2">
            {total.calories} / {goals.dailyCalories} kcal
          </div>
          <div className="w-full bg-primary/10 rounded h-4 mb-1 overflow-hidden">
            <div style={{width: `${getPercent(total.calories, goals.dailyCalories)}%`}}
                 className="h-4 rounded bg-primary transition-all duration-500"></div>
          </div>
        </div>
        {/* Macros Card */}
        <div className="flex-1 min-w-[260px] rounded-2xl bg-surfacelight dark:bg-surfacelight border border-accent/60 p-6 shadow-md">
          <div className="text-secondary font-semibold mb-3">Macros</div>
          <div className="flex gap-4 text-white font-medium mb-2">
            <span>P {total.protein}/{goals.protein}g</span>
            <span>C {total.carbs}/{goals.carbs}g</span>
            <span>F {total.fat}/{goals.fat}g</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-secondary mb-1">Protein</div>
              <div className="bg-accent/20 rounded h-3">
                <div className="h-3 rounded bg-accent transition-all duration-500"
                  style={{ width: `${getPercent(total.protein, goals.protein)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-secondary mb-1">Carbs</div>
              <div className="bg-primary/20 rounded h-3">
                <div className="h-3 rounded bg-primary transition-all duration-500"
                  style={{ width: `${getPercent(total.carbs, goals.carbs)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-secondary mb-1">Fat</div>
              <div className="bg-secondary/30 rounded h-3">
                <div className="h-3 rounded bg-secondary transition-all duration-500"
                  style={{ width: `${getPercent(total.fat, goals.fat)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-4 rounded-lg px-7 py-3 bg-accent text-white font-semibold text-lg shadow hover:bg-primary transition"
        onClick={openAddEntry}
      >
        + Add Food Entry
      </button>
    </div>
  );
}

export default Dashboard;
