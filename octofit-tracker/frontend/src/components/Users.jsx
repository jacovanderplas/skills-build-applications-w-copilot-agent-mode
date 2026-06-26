import { useEffect, useState } from 'react';

import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(usersApiUrl, controller.signal)
      .then((items) => {
        setUsers(items);
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
    return <p className="status-text">Loading users...</p>;
  }

  if (error) {
    return <p className="status-text text-danger">Unable to load users: {error}</p>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Students</h1>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id ?? user.username}>
            <article className="data-card h-100">
              <h2>{user.displayName}</h2>
              <p>@{user.username}</p>
              <p>{user.email}</p>
              <span className="tag">{user.team ?? 'No team yet'}</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;