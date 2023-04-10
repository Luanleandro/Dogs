import React from 'react';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, request, error } = useFetch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: window.location.href.replace('perdeu', 'resetar'),
    });

    request(url, options);
  };

  return (
    <section className="container mainContainer animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>Email Enviado.</p>
      ) : (
        <form action="" onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="Text" name="login" {...login} />
          {loading ? <Button>Enviando...</Button> : <Button>Enviar</Button>}
        </form>
      )}
      {error && <Error error={error} />}
    </section>
  );
};

export default LoginPasswordLost;
