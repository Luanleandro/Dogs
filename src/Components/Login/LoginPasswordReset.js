import React, { useEffect, useState } from 'react';
import useForm from '../../Hooks/useForm';
import Input from '../Forms/Input';
import useFetch from '../../Hooks/useFetch';
import Button from '../Forms/Button';
import { PASSWORD_RESET } from '../../Api';
import { useNavigate } from 'react-router-dom';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [key, setKey] = useState('');
  const [login, setLogin] = useState('');
  const password = useForm();
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });

    const { response } = await request(url, options);
    if (response.ok) navigate('/login');
  };

  return (
    <section className='animeLeft'>
      <Head title="Resete a senha" />
      <h1 className="title">Resetar a senha</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>resetando...</Button>
        ) : (
          <Button>resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
