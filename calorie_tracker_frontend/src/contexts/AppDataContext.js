import React, { createContext, useState, useContext } from "react";

// Simulated demo food log + goals + stats (replace with API fetches!)
const exampleLog = [
  { id: 1, food: "Oatmeal", calories: 210, protein: 7, carbs: 35, fat: 3, date: "2024-06-05", meal: "breakfast" },
  { id: 2, food: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, date: "2024-06-05", meal: "breakfast" },
  { id: 3, food: "Grilled Chicken Salad", calories: 390, protein: 36, carbs: 13, fat: 15, date: "2024-06-05", meal: "lunch" },
  { id: 4, food: "Apple", calories: 95, protein: 0, carbs: 25, fat: 0, date: "2024-06-05", meal: "snack" },
  { id: 5, food: "Pasta", calories: 450, protein: 15, carbs: 62, fat: 10, date: "2024-06-05", meal: "dinner" }
];

const initialGoals = { dailyCalories: 1700, protein: 80, carbs: 210, fat: 60 };

const AppDataContext = createContext();

// PUBLIC_INTERFACE
export function AppDataProvider({ children }) {
  // foodLogs: array of food entries, goals: object with macros
  const today = new Date().toISOString().substring(0, 10);
  const [foodLog, setFoodLog] = useState(exampleLog);
  const [goals, setGoals] = useState(initialGoals);

  // PUBLIC_INTERFACE
  function addEntry(newEntry) {
    newEntry.id = Date.now();
    setFoodLog(prev => [newEntry, ...prev]);
  }
  // PUBLIC_INTERFACE
  function removeEntry(entryId) {
    setFoodLog(prev => prev.filter(entry => entry.id !== entryId));
  }
  // PUBLIC_INTERFACE
  function updateGoals(goalsUpdate) {
    setGoals(goalsUpdate);
  }

  const value = {
    foodLog,
    addEntry,
    removeEntry,
    goals,
    updateGoals,
    // For dashboard: get summary for today
    todaysEntries: foodLog.filter(item => item.date === today)
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAppData() {
  return useContext(AppDataContext);
}
