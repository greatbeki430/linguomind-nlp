import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">🧠 LinguoMind</h1>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="5"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze..."
      />
      <button
        onClick={analyzeText}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Text"}
      </button>

      {result && (
        <div className="mt-6 text-left border-t pt-4">
          <p><strong>Text:</strong> {result.text}</p>
          <p><strong>Sentiment Score:</strong> {result.sentiment.toFixed(3)}</p>
          <p><strong>Created At:</strong> {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
