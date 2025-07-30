import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('Thinking...');

    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are JudgeGPT UK, a top legal assistant for UK law. You reply with a legal analysis using IRAC format and give a realistic chance of winning in court in % based on UK precedent.',
            },
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await result.json();

      if (data.error) {
        setResponse('❌ Error: ' + data.error.message);
      } else {
        const message = data.choices?.[0]?.message?.content || '⚠️ No response from model.';
        setResponse(message);
      }
    } catch (err) {
      setResponse('❌ Network error or invalid API key');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>⚖️ JudgeGPT UK</h1>
      <p>Enter your legal issue to predict your case outcome:</p>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I was stopped by the police for speeding. Can I sue them?"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Outcome'}
        </button>
      </form>
      <div className="response">
        <strong>🧠 Prediction:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;