import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import useValidUser from '@/hooks/useValidUser';
import { Button } from '@/components/Elements';
import { EMAIL } from '@/utils/regex';
import { Layout } from '../components/Layout';

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
      const { status } = await axios.post(`${BASE_API_URL}/auth/forgot-password`, {
        email
      });

      if (status !== 200) {
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

  const handleSubmit = () => {
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
    <Layout>
      <div className="h-96 rounded-lg shadow md:mt-0 sm:max-w-md p-6 sm:p-8 flex flex-col justify-center">
        {isSent ? (
          <div className="flex flex-col justify-center">
            <div className="w-60 self-center">
              <img
                src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1675177778/terbangtinggi/undraw_Mail_sent_re_0ofv_avnmqt.png"
                alt="email sent successfully"
                height={200}
                width={240}
              />
            </div>
            <p className="text-center mt-4 mb-2 text-2xl font-semibold">
              Email sent, check your inbox
            </p>
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
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
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
    </Layout>
  );
}
