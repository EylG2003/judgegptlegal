// Step 1: Add Loading Spinner
// We’ll update your existing App.jsx with a spinner while the AI thinks

// ✅ Go to your `src/App.jsx` file in your code editor or Vercel repo.
// Replace it with the following updated code:

import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // fallback, we’ll upgrade later
          messages: [
            {
              role: 'user',
              content: `LEGAL CASE: ${input}\nPlease respond in IRAC format with win chance % and similar-case statistics.`
            }
          ]
        })
      });

      const data = await res.json();
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err) {
      setError('⚠️ Error getting prediction. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>⚖️ JudgeGPT UK</h1>
      <p>Enter your legal issue to predict your case outcome:</p>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="e.g. I was stopped by police for speeding and they pulled a gun. Can I sue?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button type="submit">Predict Outcome</button>
      </form>

      {loading && <p className="loading">🌀 Judge AI is analyzing your case...</p>}
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response">
          <h2>🧠 Prediction:</h2>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

