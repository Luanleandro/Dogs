import React, { lazy, useEffect } from 'react';
import Head from '../Helper/Head';
import useFetch from '../../Hooks/useFetch';
import { STATUS_GET } from '../../Api';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';

const UserStatsGraph = lazy(() => import('./UserStatsGraph'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    async function getStats() {
      const { url, options } = STATUS_GET();
      await request(url, options);
    }

    getStats();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estátisticas" />
        <UserStatsGraph data={data} />
      </React.Suspense>
    );
};

export default UserStats;
