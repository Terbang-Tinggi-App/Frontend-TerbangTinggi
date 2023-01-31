import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import useValidUser from '@/hooks/useValidUser';
import { Button } from '@/components/Elements';
import { Logo } from '@/components/Icons';
import { EMAIL } from '@/utils/regex';
import { ForgotResetLayout } from '../components/Layout';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const handleSendEmail = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${process.env.REACT_APP_AUTH_API}/auth/forgot-password`, {
        email
      });

      const statusCode = response.status;

      if (statusCode !== 200) {
        setIsSent(false);
        setIsError(true);
      }
      setIsSent(true);
      setIsError(false);
      setIsSubmitting(false);
    } catch (error) {
      if (error) {
        setIsError(true);
        setIsSubmitting(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendEmail();
  };

  useEffect(() => {
    if (isValidUser) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    document.title = 'Forgot Password | Terbang Tinggi';
  }, []);

  return (
    <ForgotResetLayout>
      <Link className="font-bold text-2xl inline-flex items-center gap-2 mb-8" to="/">
        <Logo size={36} />
        Terbang Tinggi
      </Link>
      <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
        {isSent ? (
          <div>
            <img
              src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1670025142/terbangtinggi/email_sent_image.webp"
              alt="email sent successfully"
            />
            <p className="text-center mt-4 text-2xl font-semibold">Email sent, check your inbox</p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Forgot Your Password?
            </h2>
            <p className="mt-4 text-gray-600">
              Don&apos;t fret! Just type in your email and we will send you a code to reset your
              password!
            </p>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="emailAddress"
                  className={`w-full input   ${isError ? 'input-error' : 'input-primary'}`}
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {!isError ? null : (
                  <p className="text-error text-sm mt-1 mb-0 animate-pulse">Email not found</p>
                )}
              </div>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!email || !EMAIL.test(email) || isSubmitting}>
                {isSubmitting ? 'Submitting' : 'Send Email'}
              </Button>
            </form>
          </>
        )}
      </div>
    </ForgotResetLayout>
  );
}
