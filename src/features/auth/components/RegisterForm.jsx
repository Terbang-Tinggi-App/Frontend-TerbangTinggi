import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import useValidUser from '@/hooks/useValidUser';
import { registerUser } from '../redux/auth.actions';
import { registerSchema } from '@/utils/schemas';
import { Input, Label, FormControl } from '@/components/Form';
import { ErrorCard } from '@/components/Cards';

export function RegisterForm() {
  const { loading, error, success } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isValidUser = useValidUser();

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
  }, [success, isValidUser]);

  const handleRegister = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-w-[300px]">
      <h1 className="font-bold text-4xl">Register</h1>

      <p className="mt-3 mb-2">Welcome, Please enter your details 🙏</p>

      <ErrorCard error={error} />

      <form onSubmit={handleSubmit(handleRegister)}>
        <FormControl>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter your Username"
            {...register('username', { required: true })}
            error={errors.username?.message}
          />
        </FormControl>

        <FormControl>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your Email"
            {...register('email', { required: true })}
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

        <FormControl>
          <Label>Password Confirmation</Label>
          <Input
            type="password"
            {...register('confirmPassword', { required: true })}
            placeholder="Enter your Password Confirmation"
            error={errors.confirmPassword?.message}
          />
        </FormControl>

        <button className="btn btn-primary bg-brand mt-4 w-full" disabled={loading} type="submit">
          {loading ? 'Registering' : 'Register'}
        </button>

        <div className="text-center mt-3">
          Already have an account?{' '}
          <Link className="link" to="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
