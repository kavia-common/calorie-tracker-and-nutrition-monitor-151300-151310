import React, { useState } from "react";
import { useAppData } from "../contexts/AppDataContext";


// PUBLIC_INTERFACE
function Goals() {
  const { goals, updateGoals } = useAppData();
  const [form, setForm] = useState(goals);
  const [message, setMessage] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    updateGoals(form);
    setMessage("Goals updated!");
    setTimeout(() => setMessage(""), 1800);
  }
  return (
    <div className="ml-[200px] md:ml-0 md:mt-16 px-4 py-8 max-w-xl mx-auto">
      <h2 className="text-2xl text-primary font-bold mb-4">Update Your Goals</h2>
      {message && (
        <div className="mb-3 rounded bg-accent/90 text-white px-4 py-2 font-medium">{message}</div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="font-semibold text-primary">
          Daily Calories (kcal)
          <input
            type="number"
            name="dailyCalories"
            value={form.dailyCalories}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded p-2 bg-surfacelight border border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none text-white"
          />
        </label>
        <label className="font-semibold text-primary">
          Protein (g)
          <input
            type="number"
            name="protein"
            value={form.protein}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded p-2 bg-surfacelight border border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none text-white"
          />
        </label>
        <label className="font-semibold text-primary">
          Carbs (g)
          <input
            type="number"
            name="carbs"
            value={form.carbs}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded p-2 bg-surfacelight border border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none text-white"
          />
        </label>
        <label className="font-semibold text-primary">
          Fat (g)
          <input
            type="number"
            name="fat"
            value={form.fat}
            onChange={handleChange}
            required
            className="w-full mt-1 rounded p-2 bg-surfacelight border border-accent/40 focus:ring-2 focus:ring-accent focus:outline-none text-white"
          />
        </label>
        <button
          type="submit"
          className="rounded-lg mt-3 bg-primary px-5 py-2 font-bold text-white text-lg shadow hover:bg-accent transition"
        >
          Save Goals
        </button>
      </form>
    </div>
  );
}

export default Goals;
