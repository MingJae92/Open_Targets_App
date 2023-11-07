import React, { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';
import { CategoryScale, LinearScale, ScatterController, PointElement, Chart } from 'chart.js';


Chart.register(CategoryScale, LinearScale, ScatterController, PointElement);

function DataTable({ targets }) {
  const [selectedTarget, setSelectedTarget] = useState(null);

  const toggleChart = (target) => {
    setSelectedTarget(target);
  };

  return (
    <div className="text-center"> {/* Center the content */}
      <table className="mx-auto"> {/* Center the table */}
        <thead>
          <tr>
            <th>Approved Symbol</th>
            <th>Gene Name</th>
            <th>Overall Association Score</th>
          </tr>
        </thead>
        <tbody>
          {targets && targets.length > 0 && targets.map((target) => (
            <tr key={target.target.id}>
              <td>
                <a href={`https://platform.opentargets.org/target/${target.target.approvedName}`}>
                  {target.target.approvedSymbol}
                </a>
              </td>
              <td>{target.target.approvedName}</td>
              <td>{target.score}</td>
              <td>
                <button onClick={() => toggleChart(target)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTarget && (
        <div>
          <h2>Data Type Scores: {selectedTarget.target.approvedSymbol} and lung carcinoma</h2>
          <button onClick={() => toggleChart(null)}>Close</button>
          <div className="d-flex justify-content-center"> {/* Center the chart div */}
            {/* Display a Bar chart if data is available */}
            {selectedTarget.datatypeScores && (
              <div>
                <Bar
                  data={{
                    labels: selectedTarget.datatypeScores.map((data) => data.id),
                    datasets: [
                      {
                        label: 'Data Type Scores',
                        data: selectedTarget.datatypeScores.map((data) => data.score),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            )}
            {/* Display a Radar chart if data is available */}
            {selectedTarget.datatypeScores && (
              <div>
                <Radar
                  data={{
                    labels: selectedTarget.datatypeScores.map((data) => data.id),
                    datasets: [
                      {
                        label: 'Data Type Scores',
                        data: selectedTarget.datatypeScores.map((data) => data.score),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
