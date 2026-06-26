import { useEffect, useState } from 'react';

import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(leaderboardApiUrl, controller.signal)
      .then((items) => {
        setEntries(items);
        setError('');
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return <p className="status-text">Loading leaderboard...</p>;
  }

  if (error) {
    return <p className="status-text text-danger">Unable to load leaderboard: {error}</p>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {entries.map((entry, index) => (
          <article className="leaderboard-row" key={entry._id ?? entry.user}>
            <span className="rank">#{index + 1}</span>
            <div>
              <h2>{entry.user}</h2>
              <p>{entry.team ?? 'Independent'}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;