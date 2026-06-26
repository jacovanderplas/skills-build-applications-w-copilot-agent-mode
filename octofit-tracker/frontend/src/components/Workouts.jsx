import { useEffect, useState } from 'react';

import { fetchCollection } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(workoutsApiUrl, controller.signal)
      .then((items) => {
        setWorkouts(items);
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
    return <p className="status-text">Loading workouts...</p>;
  }

  if (error) {
    return <p className="status-text text-danger">Unable to load workouts: {error}</p>;
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-6" key={workout._id ?? workout.title}>
            <article className="data-card h-100">
              <div className="d-flex justify-content-between gap-3">
                <h2>{workout.title}</h2>
                <span className="tag text-capitalize">{workout.difficulty}</span>
              </div>
              <p>{workout.description}</p>
              <strong>{workout.durationMinutes} minutes</strong>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;