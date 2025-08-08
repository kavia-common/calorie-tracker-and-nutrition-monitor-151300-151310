import React, { useState } from "react";
import { useAppData } from "../contexts/AppDataContext";
import "../styles/AddEntryModal.css";

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
    <div className="modal-backdrop" tabIndex={-1}>
      <div className="modal">
        <button className="close" onClick={closeModal} aria-label="Close">&times;</button>
        <h2>Add Food Entry</h2>
        {error && <div className="form-error">{error}</div>}
        <form className="add-form" onSubmit={handleSubmit}>
          <input type="text" name="food" value={form.food} onChange={handleChange} placeholder="Food Name" autoFocus required />
          <input type="number" name="calories" value={form.calories} onChange={handleChange} placeholder="Calories (kcal)" required />
          <div className="macros-inputs">
            <input type="number" name="protein" value={form.protein} onChange={handleChange} placeholder="Protein (g)" />
            <input type="number" name="carbs" value={form.carbs} onChange={handleChange} placeholder="Carbs (g)" />
            <input type="number" name="fat" value={form.fat} onChange={handleChange} placeholder="Fat (g)" />
          </div>
          <select name="meal" value={form.meal} onChange={handleChange}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <button type="submit" className="btn btn-large submit">Add Entry</button>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
