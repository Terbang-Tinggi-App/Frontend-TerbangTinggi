/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '../../hooks/useValidUser';
import { login } from '../../redux/auth/auth.actions';
import Googlelogin from './Googlelogin';
import { loginSchema } from '../../utils/schemas';
import { FormControl, Label } from '../../components/Input';

export function Login() {
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(FaEyeSlash);

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

  const handleToogle = () => {
    if (type === 'password') {
      setIcon(FaEye);
      setType('text');
    } else {
      setIcon(FaEyeSlash);
      setType('password');
    }
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
    <div className="flex h-screen flex-row-reverse">
      <div className="w-full md:w-6/12 flex flex-col justify-center items-center mx-8">
        <Link to="/">
          <h1 className="font-bold text-2xl">Login</h1>
        </Link>

        <p className="text-sm mt-5">Welcome back! Please enter your details</p>

        {error ? (
          <p className="bg-red-300 p-3 mt-2 rounded-[4px] text-red-700 font-semibold w-80 text-center">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </p>
        ) : null}

        <form className="flex flex-col w-80" onSubmit={handleSubmit(handleLogin)}>
          <FormControl>
            <Label>Email</Label>
            <input
              type="email"
              className={`border focus:outline-0 rounded-md px-9 h-10 placeholder:text-sm ${
                errors.email ? 'input-error' : 'input border-brand'
              }`}
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
              <input
                type={type}
                className={`w-full h-10 border focus:outline-0 px-9 rounded-md placeholder:text-sm ${
                  errors.password ? 'input-error' : 'input border-brand'
                }`}
                placeholder="Enter your Password"
                {...register('password', { required: true })}
              />
              <button className="absolute my-3 ml-72  " type="button" onClick={handleToogle}>
                {icon}
              </button>
            </div>
          </FormControl>

          <div className="flex justify-between">
            <small className={`text-error mt-1 ${errors.password ? 'block' : 'invisible'}`}>
              {errors.password?.message}
            </small>

            <button
              className="text-xs ml-auto mt-1 text-brand"
              type="button"
              onClick={() => navigate('/forgot-password')}>
              Forgot Password
            </button>
          </div>

          <button className="btn btn-primary bg-brand mt-4" disabled={loading} type="submit">
            {loading ? 'Logging in' : 'Login'}
          </button>

          <Googlelogin />

          <div className=" text-sm text-center mt-5">
            Don&apos;t have an account?{' '}
            <Link to="/register">
              <button className="text-sm mt-2 text-brand" type="button">
                Register
              </button>{' '}
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-6/12 object-cover bg-cover bg-no-repeat bg-center bg-[url(https://images.unsplash.com/photo-1660587624398-aa9ce06fd3f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=100)]" />
    </div>
  );
}
