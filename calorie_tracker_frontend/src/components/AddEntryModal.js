import React, { useState } from "react";
import { useAppData } from "../contexts/AppDataContext";


// PUBLIC_INTERFACE
function AddEntryModal({ closeModal }) {
  const { addEntry } = useAppData();
  const today = new Date().toISOString().substring(0, 10);

  const [form, setForm] = useState({
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    date: today,
    meal: "breakfast"
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Validation
    if (!form.food || !form.calories) {
      setError("Please enter food name and calories.");
      return;
    }
    if (isNaN(form.calories) || form.calories < 0) {
      setError("Calories must be a positive number.");
      return;
    }
    addEntry({
      ...form,
      calories: parseInt(form.calories, 10),
      protein: Number(form.protein),
      carbs: Number(form.carbs),
      fat: Number(form.fat),
    });
    closeModal();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      tabIndex={-1}
    >
      <div className="relative bg-surface dark:bg-surface rounded-2xl shadow-2xl px-8 py-8 min-w-[320px] w-full max-w-md transition">
        <button
          className="absolute top-3 right-3 text-highlight text-2xl px-2 py-1 rounded-md bg-primary/10 hover:bg-primary/30 focus:outline-none"
          onClick={closeModal}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="mb-4 text-xl font-bold text-primary">Add Food Entry</h2>
        {error && (
          <div className="mb-4 rounded bg-highlight/10 text-highlight px-4 py-2 font-medium">
            {error}
          </div>
        )}
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="food"
            value={form.food}
            onChange={handleChange}
            placeholder="Food Name"
            autoFocus
            required
            className="rounded bg-surface px-3 py-2 border border-surfacelight text-white focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            placeholder="Calories (kcal)"
            required
            className="rounded bg-surface px-3 py-2 border border-surfacelight text-white focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              type="number"
              name="protein"
              value={form.protein}
              onChange={handleChange}
              placeholder="Protein (g)"
              className="rounded bg-surface px-3 py-2 border border-surfacelight text-white w-1/3 focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <input
              type="number"
              name="carbs"
              value={form.carbs}
              onChange={handleChange}
              placeholder="Carbs (g)"
              className="rounded bg-surface px-3 py-2 border border-surfacelight text-white w-1/3 focus:ring-2 focus:ring-accent focus:outline-none"
            />
            <input
              type="number"
              name="fat"
              value={form.fat}
              onChange={handleChange}
              placeholder="Fat (g)"
              className="rounded bg-surface px-3 py-2 border border-surfacelight text-white w-1/3 focus:ring-2 focus:ring-accent focus:outline-none"
            />
          </div>
          <select
            name="meal"
            value={form.meal}
            onChange={handleChange}
            className="rounded bg-surface px-3 py-2 border border-surfacelight text-white focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="rounded bg-surface px-3 py-2 border border-surfacelight text-white focus:ring-2 focus:ring-accent focus:outline-none"
          />
          <button
            type="submit"
            className="mt-3 rounded-lg bg-accent px-3 py-3 font-bold text-white transition hover:bg-primary"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
