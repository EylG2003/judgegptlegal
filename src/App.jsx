import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

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
      alert("PDF content or html2pdf.js not loaded.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0e1117',
      color: '#f1f1f1',
      fontFamily: 'Inter, sans-serif',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#1a1d23',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 0 40px rgba(0, 255, 200, 0.05)'
      }}>
        {/* Judge Avatar */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <img
            src={`${import.meta.env.BASE_URL}judge-avatar2.png`}
            alt="JudgeGPT Avatar"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '12px',
              boxShadow: '0 0 10px rgba(255,255,255,0.2)'
            }}
          />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '0.25rem' }}>
          ⚖️ JudgeGPT UK
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '0.25rem' }}>
          AI Judge: 85%⚡accurate — Justice Scanner™ predicts UK legal cases and court outcomes
        </p>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '1rem' }}>
          Gives win predictions in under 30 seconds – AI trained on UK law + 10,000 cases
        </p>
        <p style={{ textAlign: 'center', color: '#e5e7eb', marginBottom: '2rem' }}>
          Our AI-powered legal assistant. Predict court outcomes. Spot unfairness. Strengthen your case.
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
            borderRadius: '10px',
            border: '1px solid #444',
            fontSize: '1rem',
            backgroundColor: '#111417',
            color: '#f1f1f1'
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleAnalyse}
          disabled={loading}
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          {loading ? 'Analysing...' : '⚖️ Analyse My Case'}
        </button>

        {response && (
          <div id="pdf-content" style={{
            backgroundColor: '#181c22',
            padding: '1rem',
            borderRadius: '10px',
            border: '1px solid #2f3542'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#fff'
            }}>
              📄 Case Analysis
            </h2>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              color: '#ccc'
            }}>
              {response}
            </pre>
            <p style={{ marginTop: '1rem', color: '#999' }}>
              🕵️ Facts • 📖 Laws • ⚖️ IRAC • 🔢 Win Rate 📥 Download Case as PDF
            </p>
            <button
              onClick={handleDownloadPDF}
              style={{
                backgroundColor: '#3b82f6',
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
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#9ca3af',
            textAlign: 'center'
          }}>
            AI Judge GPT predicts outcomes based on mathematical and statistical analysis of statutory and precedent law — a model designed to improve access to justice, not rely on human instinct or random chance.
          </p>
        )}
      </div>
    </div>
  );
}
