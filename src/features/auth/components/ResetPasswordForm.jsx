import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ErrorCard } from '@/components/Cards';
import { Button } from '@/components/Elements';
import { Input, Label, FormControl } from '@/components/Form';
import { resetPasswordSchema } from '@/utils/schemas';
import { resetPassword } from '../redux/auth.actions';

export function ResetPasswordForm() {
  const { loading, success, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const handleResetPassword = async (data) => {
    dispatch(resetPassword({ data, token }));
  };

  useEffect(() => {
    if (success) {
      navigate('/auth/login');
    }
  }, [success]);

  return (
    <div className="flex flex-col w-full h-96 p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
      {success ? (
        <SuccessState />
      ) : (
        <div>
          <ErrorCard error={error} />
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <FormControl>
              <Label>New Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                error={errors.newPassword?.message}
                {...register('newPassword', { required: true })}
              />
            </FormControl>

            <FormControl>
              <Label>Confirm password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', { required: true })}
              />
            </FormControl>

            <Button type="submit" className="mt-4">
              {loading ? 'Resetting' : 'Reset password'}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

function SuccessState() {
  return (
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
  );
}
