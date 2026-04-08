import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_NAME ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : '/api/teams/'}`;
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched Teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title mb-4 text-primary">Teams</h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    {teams.length > 0 && Object.keys(teams[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, idx) => (
                    <tr key={team.id || idx}>
                      {Object.values(team).map((val, i) => (
                        <td key={i}>{typeof val === 'object' ? JSON.stringify(val) : val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {teams.length === 0 && <div className="alert alert-info">Aucune équipe trouvée.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
