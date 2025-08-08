import React, { useState } from "react";
import { useAppData } from "../contexts/AppDataContext";
import "../styles/Goals.css";

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
    <div className="goals-container">
      <h2>Update Your Goals</h2>
      {message && <div className="goal-message">{message}</div>}
      <form className="goal-form" onSubmit={handleSubmit}>
        <label>
          Daily Calories (kcal)
          <input type="number" name="dailyCalories" value={form.dailyCalories} onChange={handleChange} required />
        </label>
        <label>
          Protein (g)
          <input type="number" name="protein" value={form.protein} onChange={handleChange} required />
        </label>
        <label>
          Carbs (g)
          <input type="number" name="carbs" value={form.carbs} onChange={handleChange} required />
        </label>
        <label>
          Fat (g)
          <input type="number" name="fat" value={form.fat} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-large">Save Goals</button>
      </form>
    </div>
  );
}

export default Goals;
