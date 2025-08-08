import React from "react";
import { useAppData } from "../contexts/AppDataContext";


// PUBLIC_INTERFACE
function History() {
  const { foodLog } = useAppData();
  // Group by date
  const grouped = foodLog.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);
    return acc;
  }, {});

  // Sort dates descending
  const dateKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  return (
    <div className="ml-[200px] md:ml-0 md:mt-16 px-4 py-8 max-w-2xl mx-auto">
      <h2 className="text-2xl text-primary font-bold mb-6">Food Log History</h2>
      {dateKeys.length === 0 ? (
        <div className="rounded bg-secondary/10 text-secondary p-5 mt-2 font-medium text-center">
          No historical entries found.
        </div>
      ) : (
        dateKeys.map(date => {
          const entries = grouped[date];
          const totalCals = entries.reduce((s, e) => s + e.calories, 0);
          return (
            <div className="mb-8 last:mb-0 bg-surfacelight rounded-xl shadow border border-primary/10 p-5" key={date}>
              <div className="flex justify-between font-bold text-secondary mb-2">
                <span>{date}</span>
                <span className="text-primary">{totalCals} kcal</span>
              </div>
              <ul>
                {entries.map(e => (
                  <li
                    key={e.id}
                    className="flex items-center gap-2 text-white border-b border-slate-700 last:border-b-0 py-1"
                  >
                    <span className="font-medium">{e.food}</span>
                    <span className="text-highlight font-bold">{e.calories} kcal</span>
                    <span>P{e.protein}/C{e.carbs}/F{e.fat}</span>
                    <span className="ml-2 rounded bg-primary/50 px-2 py-1 text-xs text-white lowercase">{e.meal}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default History;
