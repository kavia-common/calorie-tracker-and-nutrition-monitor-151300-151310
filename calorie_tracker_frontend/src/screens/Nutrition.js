import React from "react";
import { useAppData } from "../contexts/AppDataContext";


// Simple donut SVG generator for macro breakdown
function MacroDonut({ protein, carbs, fat }) {
  // Compute total and arc lengths for SVG
  const total = protein + carbs + fat || 1;
  const pctP = protein / total;
  const pctC = carbs / total;
  const pctF = fat / total;
  const rad = 44; // radius for donut
  const circum = 2 * Math.PI * rad;
  // Start at top (offset angle)
  const offset = 0;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={60} cy={60} r={rad} fill="none" stroke="#efefef30" strokeWidth="20" />
      {/* Protein */}
      <circle
        cx={60} cy={60} r={rad}
        fill="none"
        stroke="#6FB07F"
        strokeWidth="20"
        strokeDasharray={`${pctP * circum} ${circum - pctP * circum}`}
        strokeDashoffset={offset}
      />
      {/* Carbs */}
      <circle
        cx={60} cy={60} r={rad}
        fill="none"
        stroke="#2E86AB"
        strokeWidth="20"
        strokeDasharray={`${pctC * circum} ${circum - pctC * circum}`}
        strokeDashoffset={-pctP * circum + offset}
      />
      {/* Fat */}
      <circle
        cx={60} cy={60} r={rad}
        fill="none"
        stroke="#F6C85F"
        strokeWidth="20"
        strokeDasharray={`${pctF * circum} ${circum - pctF * circum}`}
        strokeDashoffset={-(pctP + pctC) * circum + offset}
      />
      {/* Center text: kcal */}
      <text
        x="50%" y="51%" textAnchor="middle" fontSize="1.03em"
        fill="#2E86AB" fontWeight="600"
        alignmentBaseline="middle"
      >
        Macros
      </text>
    </svg>
  );
}

// PUBLIC_INTERFACE
function Nutrition() {
  const { todaysEntries } = useAppData();

  // Sum for today
  const total = todaysEntries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="ml-[200px] md:ml-0 md:mt-16 px-4 py-8 max-w-3xl mx-auto">
      <h2 className="text-2xl text-primary font-bold mb-7">Nutrition Details</h2>
      <div className="flex flex-wrap gap-8 items-center">
        <div className="flex-shrink-0 bg-surfacelight rounded-2xl shadow p-3">
          <MacroDonut protein={total.protein} carbs={total.carbs} fat={total.fat} />
        </div>
        <div className="flex-1 min-w-[190px]">
          <div className="flex justify-between py-1 text-white text-lg font-semibold">
            <span className="text-secondary">Total Calories:</span>
            <span className="text-primary">{total.calories} kcal</span>
          </div>
          <div className="flex justify-between py-1 text-lg font-semibold">
            <span className="text-secondary">Protein:</span>
            <span className="text-accent">{total.protein} g</span>
          </div>
          <div className="flex justify-between py-1 text-lg font-semibold">
            <span className="text-secondary">Carbs:</span>
            <span className="text-primary">{total.carbs} g</span>
          </div>
          <div className="flex justify-between py-1 text-lg font-semibold">
            <span className="text-secondary">Fat:</span>
            <span className="text-secondary">{total.fat} g</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nutrition;
