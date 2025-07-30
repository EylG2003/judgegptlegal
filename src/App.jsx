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
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial',
        backgroundImage: 'url("https://i.imgur.com/q3HoZ1e.jpg")', // anime courtroom style
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#1e1e1e',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          ⚖️ JudgeGPT UK — Virtual Court Assistant 👩‍⚖️📜
        </h1>

        {/* PDF Content */}
        <div
          id="pdf-content"
          style={{
            border: '2px dashed #bbb',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fefefe',
          }}
        >
          <h2>🧾 Legal Case Summary</h2>
          <p>This is where the AI-generated legal summary will appear.</p>
          <p>🕵️ Facts • 📖 Laws • ⚖️ IRAC • 🔢 Win Rate</p>
        </div>

        {/* PDF Button */}
        <button
          onClick={handleDownloadPDF}
          style={{
            backgroundColor: '#2f80ed',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          📥 Download Case as PDF
        </button>
      </div>
    </div>
  );
}

export default App;


