import { useEffect, useState } from 'react';

import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(teamsApiUrl, controller.signal)
      .then((items) => {
        setTeams(items);
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
    return <p className="status-text">Loading teams...</p>;
  }

  if (error) {
    return <p className="status-text text-danger">Unable to load teams: {error}</p>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Squads</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="data-card h-100">
              <p className="eyebrow">{team.mascot}</p>
              <h2>{team.name}</h2>
              <p>{team.members?.length ?? 0} members</p>
              <div className="tag-list">
                {(team.members ?? []).map((member) => (
                  <span className="tag" key={member}>{member}</span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;