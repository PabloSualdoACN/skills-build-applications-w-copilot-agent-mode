// API: -8000.app.github.dev/api/activities
import React, { useEffect, useState } from 'react';
import { fetchApi, normalizeResponseArray } from './ApiClient';

function Leaderboard() {
  const [rankings, setRankings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApi<any>('leaderboard');
        setRankings(normalizeResponseArray<any>(data, ['rankings', 'teamRankings']));
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
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {rankings.length > 0 ? (
                rankings.map((item) => (
                  <tr key={item._id || item.id || `${item.type}-${item.rank}`}>
                    <td>{item.rank}</td>
                    <td>{item.userId?.name ?? item.teamId?.name ?? 'Unknown'}</td>
                    <td>{item.score ?? item.points ?? '-'}</td>
                    <td>{item.type ?? 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No leaderboard entries found.
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

export default Leaderboard;
