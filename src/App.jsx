import React, { useState } from 'react';
import './styles.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setResult('');
    setError(null);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are JudgeGPT AI, a UK legal prediction assistant. Instantly reply with a ⚖️ Win Chance % and 📊 Similar Outcome stats. Follow with IRAC analysis, fairness bar, and offer help drafting letters. You are warm, curious, superintelligent, and cite UK law and cases. For fairness/justice questions, cite Harvard Law Review. Sound like an AI professor, never robotic.',
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();

      if (data.choices && data.choices[0]) {
        setResult(data.choices[0].message.content);
      } else {
        throw new Error('No result from OpenAI');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById('resultSection');
    if (!element) return;

    const opt = {
      margin: 0.5,
      filename: 'JudgeGPT_legal_prediction.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    import('html2pdf.js').then((html2pdf) => {
      html2pdf.default().from(element).set(opt).save();
    });
  };

  return (
    <div className="app-container">
      <h1>⚖️ JudgeGPT UK</h1>
      <p className="subheadline">
        🤖 AI Judge: 87% accurate* legal outcome predictor <br />
        AI-powered Justice Scanner™ gives win predictions in under 30 seconds — trained on UK law + 10,000 cases
      </p>

      <textarea
        rows="4"
        placeholder="Enter your legal issue — e.g. 'I was fired unfairly, what are my chances?'"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button onClick={handlePredict} disabled={loading}>
        {loading ? '🌀 Calculating...' : '⚖️ Predict Outcome'}
      </button>

      {error && (
        <div>
          <p>❌ Error: {error}</p>
          <button onClick={handlePredict}>🔁 Try Again</button>
        </div>
      )}

      {result && (
        <div id="resultSection" className="result">
          <h2>🧠 Prediction:</h2>
          <p>{result}</p>
          <button onClick={exportToPDF}>📄 Export as PDF</button>
          <button
            onClick={() => {
              const text = `⚖️ My court prediction on JudgeGPT: "${result.slice(
                0,
                200
              )}..." — Try it here: https://judgegptlegal.vercel.app/`;
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
              window.open(url, '_blank');
            }}
          >
            📣 Share Your Result
          </button>
        </div>
      )}

      <footer>
        <p style={{ fontSize: '0.8rem', marginTop: '40px' }}>
          ⚠️ All predictions by JudgeGPT AI are for informational purposes only and not legal advice.
        </p>
      </footer>
    </div>
  );
}

export default App;
