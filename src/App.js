import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState(''); // State to store user input
  const [sentiment, setSentiment] = useState(null); // State to store the result

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Send the input to the Flask backend
    const response = await fetch('https://bda-sentiment-analysis-back.onrender.com/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }), // Send the text as JSON
    });

    const result = await response.json();
    if (response.ok) {
      setSentiment(result.sentiment); // Update the sentiment state
    } else {
      setSentiment('Error: ' + result.error); // Handle errors
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment Analysis</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)} // Update text state
            style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
          />
          <br />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            Analyze Sentiment
          </button>
        </form>
        {sentiment && (
          <div>
            <h2>Result:</h2>
            <p>{sentiment}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
