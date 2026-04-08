import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : '/api/leaderboard/'}`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched Leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">Leaderboard</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    {leaders.length > 0 && Object.keys(leaders[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaders.map((leader, idx) => (
                    <tr key={leader.id || idx}>
                      {Object.values(leader).map((val, i) => (
                        <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {leaders.length === 0 && <div className="alert alert-info">Aucun leader trouvé.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
