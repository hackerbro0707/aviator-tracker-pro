
import React, { useState } from 'react';
import './App.css';

function App() {
  const [rounds, setRounds] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [totalProfit, setTotalProfit] = useState(0);

  const addRound = () => {
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      const newRounds = [...rounds, value];
      setRounds(newRounds);
      setInputValue('');
      setTotalProfit(newRounds.reduce((a, b) => a + b, 0));
    }
  };

  const resetRounds = () => {
    setRounds([]);
    setTotalProfit(0);
  };

  const exportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + rounds.join(',') + `\nTotal Profit,${totalProfit}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'aviator_rounds.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <h1>Aviator Tracker Pro</h1>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter round profit/loss"
      />
      <button onClick={addRound}>Add Round</button>
      <button onClick={resetRounds}>Reset</button>
      <button onClick={exportCSV}>Export CSV</button>
      <h2>Total Profit: ₹{totalProfit}</h2>
      <ul>
        {rounds.map((round, index) => (
          <li key={index}>Round {index + 1}: ₹{round}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
