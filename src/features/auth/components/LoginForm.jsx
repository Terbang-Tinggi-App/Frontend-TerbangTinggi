/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '@/hooks/useValidUser';
import { Input } from '@/components/Input/Input';
import { login } from '../redux/auth.actions';
import { loginSchema } from '@/utils/schemas';
import { FormControl, Label } from '@/components/Input';

export function LoginForm() {
  const { loading, userInfo, error } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  // TODO: Handle redirect to last page later
  const redirect = searchParams.get('redirect');
  const id = searchParams.get('id');
  const passengers = searchParams.get('passengers');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isValidUser) {
      navigate('/');
    }

    if (userInfo) {
      toast('Logged in', {
        autoClose: 1000,
        position: 'bottom-right',
        type: 'success'
      });
      navigate('/');
    }
  }, [userInfo]);

  return (
    <div>
      <Link to="/">
        <h1 className="font-bold text-2xl">Login</h1>
      </Link>

      <p className="text-sm mt-5">Welcome back! Please enter your details</p>

      {error ? (
        <p className="bg-red-300 p-3 mt-2 rounded-[4px] text-red-700 font-semibold w-80 text-center">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </p>
      ) : null}

      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl>
          <Label>Email</Label>
          <Input
            type="email"
            className={`${errors.email ? 'input-error' : 'input border-brand'} w-72`}
            placeholder="Enter your Email"
            {...register('email', { required: true })}
          />
          <small className={`text-error mt-1 ${errors.email ? 'block' : 'invisible'}`}>
            {errors.email?.message}
          </small>
        </FormControl>

        <FormControl>
          <Label>Password</Label>
          <div className="flex flex-wrap">
            <Input
              type="password"
              className={`${errors.password ? 'input-error' : 'input border-brand'} w-72`}
              placeholder="Enter your Password"
              {...register('password', { required: true })}
            />
          </div>
        </FormControl>

        <div className="flex justify-between">
          <small className={`text-error mt-1 ${errors.password ? 'block' : 'invisible'}`}>
            {errors.password?.message}
          </small>

          <Link className="link" to="/auth/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-primary bg-brand mt-4 w-full" disabled={loading} type="submit">
          {loading ? 'Logging in' : 'Login'}
        </button>

        <p className="mt-2">
          Don&apos;t have an account?{' '}
          <Link className="link" to="/auth/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
