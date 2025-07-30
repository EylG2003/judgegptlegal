import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    // Placeholder GPT logic (replace with real GPT later)
    setTimeout(() => {
      setResponse(
        `⚖️ Probability of Success: 76%\n\n📄 Issue: Whether the police officer’s use of force was lawful\n\n📚 Rule: UK common law allows reasonable force by police in arrest\n\n🔍 Application: Officer used a weapon for a traffic violation. No threat shown.\n\n✅ Conclusion: Excessive force. Likely breach of rights under ECHR Art. 3.\n\n📊 Out of 100 similar UK cases: 74 in favor of claimant.`
      );
      setLoading(false);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (element && window.html2pdf) {
      window.html2pdf().from(element).save();
    } else {
      alert("PDF generator not loaded or content missing.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f9f9fb',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0,0,0,0.08)',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          ⚖️ JudgeGPT UK
        </h1>
        <p style={{
          fontSize: '1rem',
          color: '#555',
          marginBottom: '2rem'
        }}>
          Your AI-powered legal assistant. Predict court outcomes. Spot unfairness. Strengthen your case.
        </p>

        <label htmlFor="case-input" style={{ fontWeight: '500' }}>
          📝 Describe your legal issue:
        </label>
        <textarea
          id="case-input"
          placeholder="E.g. I was pulled over and the officer used force without reason..."
          rows="5"
          style={{
            width: '100%',
            marginTop: '0.5rem',
            marginBottom: '1rem',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            resize: 'none'
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleAnalyse}
          disabled={loading}
          style={{
            backgroundColor: '#2f80ed',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '1.5rem'
          }}
        >
          {loading ? 'Analysing...' : '⚖️ Analyse My Case'}
        </button>

        {response && (
          <div id="pdf-content" style={{
            backgroundColor: '#f1f5f9',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              📄 Case Analysis
            </h2>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              color: '#333'
            }}>
              {response}
            </pre>
            <button
              onClick={handleDownloadPDF}
              style={{
                backgroundColor: '#10b981',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                marginTop: '1rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              📥 Download as PDF
            </button>
          </div>
        )}

        {!response && (
          <p style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: '#888',
            textAlign: 'center'
          }}>
            ⚠️ This tool is not legal advice. For formal help, consult a solicitor.
          </p>
        )}
      </div>
    </div>
  );
}
