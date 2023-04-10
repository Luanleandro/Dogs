import React, { useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../Api';
import PhotoContent from './PhotoContent';
import Head from '../Helper/Head';

const Photo = () => {
  const { data, loading, request, error } = useFetch();
  const { id } = useParams();
  console.log(data);

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [request, id]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
};

export default Photo;
