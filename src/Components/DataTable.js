import React, { useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';

function DataTable({ targets }) {
  const [selectedTarget, setSelectedTarget] = useState(null);

  const toggleChart = (target) => {
    setSelectedTarget(target);
  };

  const chartData = selectedTarget ? (selectedTarget.datatypeScores || []) : [];

  const chartTitle = selectedTarget
    ? `Data Type Scores: ${selectedTarget.target.approvedSymbol} and lung carcinoma`
    : '';

  const chartLabels = chartData.map((data) => data.id);
  const chartScores = chartData.map((data) => data.score);

  const barChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Data Type Scores',
        data: chartScores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Data Type Scores',
        data: chartScores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <table>
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
          <h2>{chartTitle}</h2>
          <button onClick={() => toggleChart(null)}>Close</button>
          <div>
            <div>
              <Bar data={barChartData} />
            </div>
            <div>
              <Radar data={radarChartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
