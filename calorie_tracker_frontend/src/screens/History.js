import React from "react";
import { useAppData } from "../contexts/AppDataContext";
import "../styles/History.css";

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
    <div className="history-container">
      <h2>Food Log History</h2>
      {dateKeys.length === 0 ? (
        <div className="empty-history">No historical entries found.</div>
      ) : (
        dateKeys.map(date => {
          const entries = grouped[date];
          const totalCals = entries.reduce((s, e) => s + e.calories, 0);
          return (
            <div className="history-day" key={date}>
              <div className="history-date">
                {date}
                <span className="history-day-total">{totalCals} kcal</span>
              </div>
              <ul className="history-list">
                {entries.map(e => (
                  <li key={e.id}>
                    {e.food} (
                    <span className="hist-cals">{e.calories} kcal</span>, P{e.protein}/C{e.carbs}/F{e.fat}
                    )
                    <span className="meal-tag">{e.meal}</span>
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
