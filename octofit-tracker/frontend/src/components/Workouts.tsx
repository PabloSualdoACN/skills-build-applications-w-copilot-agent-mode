import React, { useEffect, useState } from 'react';
import { fetchApi, normalizeResponseArray } from './ApiClient';

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApi<any>('workouts');
        setWorkouts(normalizeResponseArray<any>(data, ['workouts']));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <tr key={workout._id || workout.id || workout.title}>
                    <td>{workout.title}</td>
                    <td>{workout.difficulty ?? 'N/A'}</td>
                    <td>{workout.duration ?? '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center">
                    No workout suggestions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Workouts;
