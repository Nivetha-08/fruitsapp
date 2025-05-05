import React, { useState } from 'react';

const FruitsApp = () => {
  const [fruits, setFruits] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const addHandler = () => {
    const trimmed = input.trim();
    if (!trimmed) return alert("Please enter a fruit name");
    if (fruits.includes(trimmed)) return alert("Fruit already exists");

    setFruits([...fruits, trimmed]);
    setInput('');
  };

  const startEditHandler = (index) => {
    setInput(fruits[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const updateHandler = () => {
    const trimmed = input.trim();
    if (!trimmed) return alert("Please enter a valid fruit name");

    const updatedFruits = [...fruits];
    updatedFruits[editIndex] = trimmed;
    setFruits(updatedFruits);

    setInput('');
    setIsEditing(false);
    setEditIndex(null);
  };

  const deleteHandler = (index) => {
    const updated = fruits.filter((_, i) => i !== index);
    setFruits(updated);
  };

  const clearAllHandler = () => {
    if (window.confirm("Are you sure you want to clear all fruits?")) {
      setFruits([]);
    }
  };

  return (
    <>
      <h1 className="text-warning text-center p-4">FRUITS APP (ARRAY CRUD)</h1>

      <div className="d-flex justify-content-center gap-3 mb-4">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Enter fruit name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {!isEditing ? (
          <button className="btn btn-success" onClick={addHandler}>ADD</button>
        ) : (
          <button className="btn btn-primary" onClick={updateHandler}>UPDATE</button>
        )}

        <button className="btn btn-secondary" onClick={clearAllHandler}>CLEAR ALL</button>
      </div>

      <div className="text-center">
        {fruits.length === 0 ? (
          <p className="text-muted">No fruits added yet.</p>
        ) : (
          fruits.map((fruit, index) => (
            <div key={index} className="d-flex justify-content-center align-items-center gap-3 mb-2">
              <span className="h6 mb-0">{index + 1}. {fruit}</span>
              <button className="btn btn-warning btn-sm" onClick={() => startEditHandler(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FruitsApp;
