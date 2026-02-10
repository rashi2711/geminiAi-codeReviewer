// src/App.jsx
import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // fallback if rehype fails
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(
    `function sum(a, b) {
  return a + b; // TODO: handle non-numbers?
}`
  );

  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true);
    setError(null);
    setReview('');

    try {
      const response = await axios.post('/ai/get-review', { code });
      const reviewText = response.data.review || response.data || '';

      if (!reviewText.trim()) {
        throw new Error('Empty response from AI');
      }

      setReview(reviewText);
    } catch (err) {
      console.error('Review failed:', err);
      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to get review. Backend may be down.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <main>
        <section className="left">
          <div className="editor-wrapper">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 15,
                background: 'transparent',
                color: '#c9d1d9',
                height: '100%',
                width: '100%',
              }}
            />
          </div>

          <button
            className={`review-btn ${loading ? 'loading' : ''}`}
            onClick={reviewCode}
            disabled={loading}
            aria-label="Generate AI code review"
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              'Get AI Review'
            )}
          </button>
        </section>

        <section className="right">
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="markdown-preview">
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review ||
                (loading
                  ? '🔍 Analyzing your code... (this may take a few seconds)'
                  : 'Paste your code on the left and click **Get AI Review** to see detailed feedback ✨')}
            </Markdown>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;