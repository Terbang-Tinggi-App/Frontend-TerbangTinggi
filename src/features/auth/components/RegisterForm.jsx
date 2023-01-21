import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '../../../hooks/useValidUser';
import { registerUser } from '../utils/auth.actions';
import { registerSchema } from '../../../utils/schemas';

export function RegisterForm() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const { loading, error, success } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
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

    // This will cause bug if user is redirected to /login and user back to /register route it'll automatically redirect
    // again to /login cause status state is still true, make it after register user already logged in
    // and handle confirmation email later if user want to process transaction or book ticket
    if (success) {
      toast('Register success, check your email to verify account', {
        autoClose: 2000,
        type: 'success'
      });
      navigate('/login');
    }
  }, [success]);

  const handleRegister = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      <Link to="/">
        <h1 className="font-bold text-2xl">Register</h1>
      </Link>

      <p className="text-sm mt-2">Get Started! Please enter your details</p>

      {error ? (
        <p className="bg-red-300 p-3 mt-2 rounded-[4px] text-red-700 font-semibold w-80 text-center">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </p>
      ) : null}

      <form className="flex flex-col w-80" onSubmit={handleSubmit(handleRegister)}>
        <div className="mt-2">Username</div>
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
          disabled={loading}
          type="submit">
          {loading ? 'Registering' : 'Register'}
        </button>

        {/* <Googlelogin type="Register" /> */}

        <div className=" text-sm text-center mt-3">
          Already Have An Account?{' '}
          <Link to="/login">
            <button className="mt-2 text-brand" type="button">
              Login
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
