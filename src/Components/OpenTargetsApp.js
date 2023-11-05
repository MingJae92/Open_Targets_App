import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DataTable from './DataTable';

const GET_TARGETS = gql`
  query lungCarcinomaAssociatedTargets {
    disease(efoId: "EFO_0001071") {
      associatedTargets(page: { index: 0, size: 25 }) {
        rows {
          target {
            id
            approvedSymbol
            approvedName
          }
          score
          datatypeScores {
            id
            score
          }
        }
      }
    }
  }
`;

function OpenTargetsApp() {
  const { loading, error, data } = useQuery(GET_TARGETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const targets = data.disease.associatedTargets.rows;
  targets.sort((a, b) => b.score - a.score);
  const topTargets = targets.slice(0, 10);

  return (
    <div>
      <h1>Top 10 Drug Targets for Lung Carcinoma</h1>
      <DataTable targets={topTargets} />
    </div>
  );
}

export default OpenTargetsApp;
