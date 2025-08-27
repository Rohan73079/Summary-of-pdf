export const callGeminiApi = async (payload, setError) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    setError?.("Missing Gemini API key. Add VITE_GEMINI_API_KEY to .env");
    return null;
  }
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(()=>({message: 'no json'}));
      throw new Error(`API Error: ${response.status} - ${err.error?.message || err.message || 'Unknown'}`);
    }
    const result = await response.json();
    return result?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch (e) {
    setError?.(`API call failed: ${e.message}`);
    return null;
  }
};
