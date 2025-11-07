import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!keyword.trim() || !targetUrl.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('/api/check-ranking', {
        keyword: keyword.trim(),
        targetUrl: targetUrl.trim()
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to check ranking. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKeyword('');
    setTargetUrl('');
    setResult(null);
    setError('');
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>🔍 Google Ranking Checker</h1>
          <p>Find out where your website ranks on Google</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="keyword">Search Keyword</label>
              <input
                type="text"
                id="keyword"
                placeholder="e.g., best coffee shops"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetUrl">Your Website URL</label>
              <input
                type="text"
                id="targetUrl"
                placeholder="e.g., example.com or https://example.com/page"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="button-group">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Checking...
                  </>
                ) : (
                  'Check Ranking'
                )}
              </button>
              {(result || error) && (
                <button type="button" className="btn btn-secondary" onClick={handleReset}>
                  Reset
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              {error}
            </div>
          )}

          {result && (
            <div className="results">
              {/* Ranking Algorithm Display - Shows Exact Position */}
              <div className="ranking-algorithm">
                <div className="algorithm-header">
                  <span className="algorithm-icon">🎯</span>
                  <h3>Ranking Analysis</h3>
                </div>
                <div className="algorithm-content">
                  {result.ranking ? (
                    <>
                      <div className="exact-ranking">
                        <div className="ranking-number">#{result.ranking}</div>
                        <div className="ranking-info">
                          <div className="ranking-label">Exact Position</div>
                          <div className="ranking-stats">
                            <span className="stat">📊 Out of {result.totalResults} results</span>
                            <span className="stat">
                              📈 Top {Math.round((result.ranking / result.totalResults) * 100)}% ranking
                            </span>
                            {result.pagesSearched && (
                              <span className="stat">
                                📄 Searched {result.pagesSearched} page{result.pagesSearched > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ranking-status success">
                        ✓ Your website "{result.targetUrl}" is ranking for "{result.keyword}"
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="exact-ranking not-found-rank">
                        <div className="ranking-number">N/A</div>
                        <div className="ranking-info">
                          <div className="ranking-label">Not Found</div>
                          <div className="ranking-stats">
                            <span className="stat">📊 Searched {result.totalResults} results</span>
                            {result.pagesSearched && (
                              <span className="stat">
                                📄 Searched {result.pagesSearched} page{result.pagesSearched > 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="ranking-status error">
                        ✗ Your website "{result.targetUrl}" was not found in {result.totalResults} results across {result.pagesSearched || 1} page{(result.pagesSearched || 1) > 1 ? 's' : ''}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Detailed Information */}
              {result.ranking ? (
                <>
                  <div className="result-header">
                    <h2>📍 Found at Position #{result.ranking}</h2>
                  </div>
                  
                  <div className="result-details">
                    <div className="detail-item">
                      <span className="detail-label">Keyword:</span>
                      <span className="detail-value">{result.keyword}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Your URL:</span>
                      <span className="detail-value">{result.targetUrl}</span>
                    </div>
                    {result.foundResult && (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Title:</span>
                          <span className="detail-value">{result.foundResult.title}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Full URL:</span>
                          <span className="detail-value">
                            <a href={result.foundResult.url} target="_blank" rel="noopener noreferrer">
                              {result.foundResult.displayUrl}
                            </a>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="result-header not-found">
                  <span className="not-found-icon">❌</span>
                  <h2>Not Found in Top {result.totalResults} Results</h2>
                  <p>Your website was not found in the search results for "{result.keyword}"</p>
                </div>
              )}

              {result.allResults && result.allResults.length > 0 && (
                <div className="top-results">
                  <h3>
                    All Search Results ({result.allResults.length} found
                    {result.pagesSearched && ` across ${result.pagesSearched} page${result.pagesSearched > 1 ? 's' : ''}`}
                    ):
                  </h3>
                  <p className="results-info">
                    {result.ranking 
                      ? `Your website is highlighted at position #${result.ranking}` 
                      : 'Your website is not in these results'}
                  </p>
                  <div className="results-list">
                    {result.allResults.map((item, index) => {
                      const isYourSite = result.foundResult && item.rank === result.ranking;
                      return (
                        <div 
                          key={index} 
                          className={`result-item ${isYourSite ? 'highlighted' : ''}`}
                        >
                          <span className="result-rank">#{item.rank}</span>
                          <div className="result-content">
                            <div className="result-title">
                              {item.title}
                              {isYourSite && <span className="your-site-badge">← YOUR SITE</span>}
                            </div>
                            <div className="result-url">{item.displayUrl}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="footer">
          <p>⚠️ Please use responsibly and respect Google's Terms of Service</p>
        </div>
      </div>
    </div>
  );
}

export default App;

