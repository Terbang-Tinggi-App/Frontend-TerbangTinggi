/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '@/hooks/useValidUser';
import { login } from '../redux/auth.actions';
import { loginSchema } from '@/utils/schemas';
import { FormControl, Input, Label, ErrorCard } from '@/components/Input';
import GoogleLogin from './Googlelogin';

export function LoginForm() {
  const userEmailLocalStorage = localStorage.getItem('userEmail');
  const redirectAfterLogin = sessionStorage.getItem('redirectTo');

  const [rememberMe, setRememberMe] = useState(Boolean(userEmailLocalStorage));

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
    if (rememberMe) {
      localStorage.setItem('userEmail', data.email);
    } else {
      localStorage.removeItem('userEmail');
    }
    dispatch(login(data));
  };

  useEffect(() => {
    if (isValidUser && redirectAfterLogin) {
      sessionStorage.removeItem('redirectTo');
      navigate(redirectAfterLogin);
    }

    if (userInfo && redirectAfterLogin) {
      toast('Logged in', {
        autoClose: 1000,
        type: 'success'
      });
      sessionStorage.removeItem('redirectTo');
      navigate(redirectAfterLogin);
    }
  }, [userInfo]);

  return (
    <div className="min-w-[300px]">
      <h1 className="font-bold text-4xl">Login</h1>

      <p className="mt-3 mb-[26px]">Hi, Welcome back 👋</p>

      <ErrorCard error={error} />
      <GoogleLogin />

      <div className="my-3 text-center">
        <p>or Login with Email</p>
      </div>

      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your Email"
            {...register('email', { required: true, value: userEmailLocalStorage })}
            error={errors.email?.message}
          />
        </FormControl>

        <FormControl>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your Password"
            {...register('password', { required: true })}
            error={errors.password?.message}
          />
        </FormControl>

        <div className="flex justify-between items-center">
          <FormControl>
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="ml-1">Remember Me</span>
            </label>
          </FormControl>

          <Link className="link" to="/auth/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-primary bg-brand mt-4 w-full" disabled={loading} type="submit">
          {loading ? 'Logging in' : 'Login'}
        </button>

        <p className="mt-2 text-center">
          Don&apos;t have an account?{' '}
          <Link className="link" to="/auth/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
