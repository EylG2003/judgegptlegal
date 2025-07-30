import React, { useState } from 'react';

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
              content: 'You are JudgeGPT UK, an expert in UK law. Answer using IRAC format and include a percentage win chance estimate.',
            },
            { role: 'user', content: input },
          ],
        }),
      });

      const data = await result.json();
      const message = data.choices?.[0]?.message?.content || 'No response';
      setResponse(message);
    } catch (err) {
      setResponse('Error contacting GPT-4');
    }

    setLoading(false);
  };

  return (
    <div className="container" style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>⚖️ JudgeGPT UK</h1>
      <p>Enter your legal issue to predict your case outcome:</p>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          cols="60"
          placeholder="Describe your case here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Predict Outcome'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h3>🧠 Prediction:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
