import React from 'react';

function App() {
  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (element && window.html2pdf) {
      window.html2pdf().from(element).save();
    } else {
      alert("PDF content not found or html2pdf not loaded.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📄 JudgeGPT Legal Report</h1>

      {/* PDF Content */}
      <div
        id="pdf-content"
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
        }}
      >
        <h2>Your Legal Case Summary</h2>
        <p>
          This is an example legal report. Include facts, legal analysis,
          IRAC, and probability of success.
        </p>
      </div>

      {/* PDF Button */}
      <button
        onClick={handleDownloadPDF}
        style={{
          backgroundColor: '#2f80ed',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Download as PDF
      </button>
    </div>
  );
}

export default App;

