import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '../../hooks/useValidUser';
import { registerUser } from '../../redux/user/user.actions';
import { registerSchema } from '../../utils/schemas';
import Googlelogin from '../Login/Googlelogin';

export function Register() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: yupResolver(registerSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValidUser = useValidUser();

  const handleToogle = () => {
    setPasswordEye(!passwordEye);
  };
  const handleConfirmToogle = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  useEffect(() => {
    if (isValidUser) {
      navigate('/');
    }
  }, []);

  const handleRegister = (data) => {
    dispatch(
      registerUser(data, (status) => {
        if (status === 201 || status === 200) {
          toast('Register success, check your email');
          navigate('/login');
        }
      })
    );
  };

  return (
    <div className="flex h-screen flex-row-reverse">
      <div className="w-full md:w-6/12 flex flex-col justify-center items-center mx-8">
        <Link to="/">
          <h1 className="font-bold text-2xl">Register</h1>
        </Link>

        <p className="text-sm mt-5  ">Get Started! Please enter your details</p>

        <form className="flex flex-col w-80" onSubmit={handleSubmit(handleRegister)}>
          <div className="mt-3">Username</div>
          <input
            type="text"
            className={`focus:outline-0 border border-brand px-9 rounded-md pl-5 h-10 placeholder:text-sm ${
              errors.username && 'border-error'
            }`}
            placeholder="Enter your Username"
            {...register('username', { required: true })}
          />
          <small className={`text-error mt-1 ${errors.username ? 'block' : 'invisible'}`}>
            {errors.username?.message}
          </small>

          <div className="mt-2">Email</div>
          <input
            type="email"
            className={`focus:outline-0 border  border-brand px-9 rounded-md h-10 pl-5 placeholder:text-sm ${
              errors.email && 'border-error'
            }`}
            placeholder="Enter your Email"
            {...register('email', { required: true })}
          />
          <small className={`text-error mt-1 ${errors.email ? 'block' : 'invisible'}`}>
            {errors.email?.message}
          </small>

          <div className="mt-2">Password</div>
          <div className="flex">
            <input
              className={`w-full focus:outline-0 border px-9 border-brand h-10 pl-5 rounded-md placeholder:text-sm ${
                errors.password && 'border-error'
              }`}
              type={passwordEye === false ? 'password' : 'text'}
              placeholder="Enter your Password"
              {...register('password', { required: true })}
            />
            <span className="absolute ml-72 my-3">
              {passwordEye === false ? (
                <FaEyeSlash onClick={handleToogle} />
              ) : (
                <FaEye onClick={handleToogle} />
              )}
            </span>
          </div>
          <small className={`text-error mt-1 ${errors.password ? 'block' : 'invisible'}`}>
            {errors.password?.message}
          </small>

          <div className="mt-2">Password Confirmation</div>
          <div className="flex">
            <input
              className={`w-full focus:outline-0 border border-brand px-9 pl-5 rounded-md h-10 placeholder:text-sm ${
                errors.confirmPassword && 'border-error'
              }`}
              type={confirmPasswordEye === false ? 'password' : 'text'}
              {...register('confirmPassword', { required: true })}
              placeholder="Enter your Password Confirmation"
            />
            <span className="absolute ml-72 my-3">
              {confirmPasswordEye === false ? (
                <FaEyeSlash onClick={handleConfirmToogle} />
              ) : (
                <FaEye onClick={handleConfirmToogle} />
              )}
            </span>
          </div>
          <small className={`text-error mt-1 ${errors.confirmPassword ? 'block' : 'invisible'}`}>
            {errors.confirmPassword?.message}
          </small>

          <button
            className="bg-brand rounded-md mt-5 text-white text-sm h-8 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
            disabled={isSubmitting}
            type="submit">
            {isSubmitting ? 'Registering' : 'Register'}
          </button>

          <Googlelogin type="Register" />

          <div className=" text-sm text-center mt-3">
            Already Have An Account?{' '}
            <Link to="/login">
              <button className="mt-2 text-brand" type="button">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
      <div className="hidden md:block w-6/12 object-cover bg-cover bg-no-repeat bg-center bg-[url(https://images.unsplash.com/photo-1660587624398-aa9ce06fd3f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=100)]" />
    </div>
  );
}
