import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'https://api.platform.opentargets.org/api/v4/graphql';

function DiseaseTargets() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL, {
          query: `
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
          `,
        });

        setData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData(); // Call the function inside useEffect

  }, []);

  return (
    <div>
      <h1>Lung Carcinoma Associated Targets</h1>
     
    </div>
  );
}

export default DiseaseTargets;
