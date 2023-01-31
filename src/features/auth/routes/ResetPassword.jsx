import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import { Button } from '@/components/Elements';
import { resetPasswordSchema } from '@/utils/schemas';
import { Layout } from '../components/Layout';

export function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleResetPassword = async (data) => {
    try {
      setIsSubmitting(true);
      const { status } = await axios.patch(
        `${BASE_API_URL}/auth/reset-password?token=${token}`,
        data
      );
      if (status === 200) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 3000);
        setIsSubmitting(false);
      } else {
        setIsSuccess(false);
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    document.title = 'Forgot Password | Terbang Tinggi';
  }, []);

  return (
    <Layout>
      {isSuccess ? (
        <div className="flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1675177778/terbangtinggi/undraw_Completing_re_i7ap_rwh8jc.png"
            alt="password is reset"
            height={200}
            width={240}
          />
          <p className="text-center my-4 text-2xl font-semibold">
            Password is changed. Redirecting to login page...
          </p>
        </div>
      ) : (
        <div className="flex flex-col w-full h-96 p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(handleResetPassword)}>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                New Password
              </label>
              <div className="relative mb-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`input w-full ${errors.newPassword ? 'input-error' : 'input-primary'}`}
                  required
                  {...register('newPassword', { required: true })}
                />
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  tabIndex={-1}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  title="Show password">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {errors.newPassword && (
                <small className="text-error mt-0">{errors.newPassword.message}</small>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`input w-full ${
                  errors.confirmPassword ? 'input-error' : 'input-primary'
                }`}
                required
                {...register('confirmPassword', { required: true })}
              />
            </div>
            {errors.confirmPassword && (
              <small className="text-error mt-0">{errors.confirmPassword.message}</small>
            )}

            <Button
              type="submit"
              disabled={errors.confirmPassword || errors.newPassword || isSubmitting}>
              {isSubmitting ? 'Resetting' : 'Reset password'}
            </Button>
          </form>
        </div>
      )}
    </Layout>
  );
}
