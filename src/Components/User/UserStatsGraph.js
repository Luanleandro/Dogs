import React, { useEffect, useState } from 'react';
import { VictoryPie, VictoryBar, VictoryChart } from 'victory';
import styles from './UserStatsGraph.module.css';

const UserStatsGraph = ({ data }) => {
  const [graph, setGraph] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b),
    );

    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph}`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        {' '}
        <p>Acessos: {total}</p>
      </div>

      <div className={`${styles.graphItem}`}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraph;
