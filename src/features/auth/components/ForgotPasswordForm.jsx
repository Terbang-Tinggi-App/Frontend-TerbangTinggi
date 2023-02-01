import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ErrorCard } from '@/components/Cards';
import { Button } from '@/components/Elements';
import { FormControl, Input, Label } from '@/components/Form';
import { forgotPasswordSchema } from '@/utils/schemas';
import { forgotPassword } from '../redux/auth.actions';

export function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const handleForgotPassword = async (data) => {
    dispatch(forgotPassword({ email: data.email }));
  };

  useEffect(() => {
    if (success) {
      navigate('/auth/login');
    }
  }, [success]);

  return (
    <div className="h-96 rounded-lg md:shadow md:mt-0 w-full sm:max-w-md p-6 sm:p-8 flex flex-col justify-center">
      {success ? (
        <SuccessState />
      ) : (
        <div>
          <ErrorCard error={error} className="w-full" />

          <h2 className="text-xl font-bold text-gray-900 md:text-2xl ">Forgot Your Password?</h2>
          <p className="mt-4 text-gray-600">
            Don&apos;t fret! Just type in your email and we will send you a code to reset your
            password!
          </p>

          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <FormControl>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your Email"
                {...register('email', { required: true })}
                error={errors.email?.message}
              />
            </FormControl>
            <Button className="mt-2" type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-60 self-center">
        <img
          src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1675177778/terbangtinggi/undraw_Mail_sent_re_0ofv_avnmqt.png"
          alt="email sent successfully"
          height={200}
          width={240}
        />
      </div>
      <p className="text-center mt-4 mb-2 text-2xl font-semibold">Email sent, check your inbox</p>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
