import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GOOGLE_CLIENT_ID } from '@/config';
import { Spinner } from '@/components/Elements';

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
        type="button">
        Refresh
      </button>
    </div>
  );
}

export function AppProvider({ children }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Router>{children}</Router>
        </GoogleOAuthProvider>
        <ToastContainer autoClose={500} position="bottom-right" />
      </ErrorBoundary>
    </Suspense>
  );
}
