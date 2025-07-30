import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    setPrediction('');

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You're a UK legal assistant. Predict court success using IRAC format and similar case stats.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.error?.message?.includes("model")) {
        // Fallback to GPT-3.5
        const fallback = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You're a UK legal assistant. Predict court success using IRAC format and similar case stats.",
              },
              {
                role: "user",
                content: input,
              },
            ],
          }),
        });

        const fallbackData = await fallback.json();
        setPrediction(fallbackData.choices?.[0]?.message?.content || "No response.");
      } else {
        setPrediction(data.choices?.[0]?.message?.content || "No response.");
      }
    } catch (err) {
      setError("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>⚖️ JudgeGPT UK</h1>
      <p>Enter your legal issue to predict your case outcome:</p>
      <textarea
        rows="6"
        cols="50"
        placeholder="Describe your case here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handlePredict}>Predict Outcome</button>

      {loading && <p>🌀 Calculating...</p>}
      {error && <p>{error}</p>}
      {prediction && (
        <div>
          <h3>🧠 Prediction:</h3>
          <pre>{prediction}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
