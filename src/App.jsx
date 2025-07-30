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
      setResponse('❌ Error: ' + data.erro
