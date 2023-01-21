import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Icons/Logo';

export default function Verifiedemail() {
  const navigate = useNavigate();
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-10 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-10">
          <div className="flex items-center justify-center h-10">
            <div className="font-bold text-2xl hidden  md:inline-flex items-center gap-2">
              <Logo size={36} />
              Terbang Tinggi
            </div>
          </div>
          <div className="flex items-center justify-center h-16 mt-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="291.63"
              height="226.742"
              viewBox="0 0 291.63 226.742"
            >
              <path
                d="M321.7,116.678v93.814a14.951,14.951,0,0,1-14.951,14.951H174.061a14.951,14.951,0,0,1-14.951-14.951V116.678l3.157-2.432,65.354-50.017a21.039,21.039,0,0,1,25.582,0l65.342,50.046Z"
                transform="translate(-94.624 -35.619)"
                fill="#1976d2"
              />
              <path
                d="M328.94,90.274V193.766H194.09V90.274a8.88,8.88,0,0,1,8.88-8.884H320.06A8.88,8.88,0,0,1,328.94,90.274Z"
                transform="translate(-115.426 -48.403)"
                fill="#eee"
              />
              <path
                d="M321.7,196.432v89.716A14.951,14.951,0,0,1,306.751,301.1H174.061a14.959,14.959,0,0,1-14.59-11.666,15.117,15.117,0,0,1-.361-3.285V196.432L162.267,194l59.453,31.613,1.945,1.033,5.48,2.914a23.977,23.977,0,0,0,22.51,0l5.492-2.882,2.363-1.256,59.035-31.394Z"
                transform="translate(-94.624 -115.373)"
                fill="#1565c0"
              />
              <path
                d="M328.94,207.73V268.9H194.09V208.05l55.87,29.708a23.977,23.977,0,0,0,22.51,0Z"
                transform="translate(-115.426 -123.538)"
                fill="#bdbdbd"
              />
              <path
                d="M321.7,200v93.814a14.951,14.951,0,0,1-14.951,14.951H174.061a14.959,14.959,0,0,1-14.59-11.666,15.117,15.117,0,0,1-.361-3.285V200l62.61,33.295,1.945,1.034,5.48,2.914a23.977,23.977,0,0,0,22.51,0l5.492-2.9,2.363-1.256Z"
                transform="translate(-94.624 -118.941)"
                fill="#1e88e5"
              />
              <path
                d="M322.231,319.486v14.708a14.719,14.719,0,0,1-14.951,14.469H174.591A14.86,14.86,0,0,1,160,337.372v-17.63l62.261-44.092,6.485-4.588a21.857,21.857,0,0,1,25.128,0l6.169,4.369Z"
                transform="translate(-95.153 -158.84)"
                fill="#1976d2"
              />
              <path
                d="M321.7,321.49v12.216a14.951,14.951,0,0,1-14.951,14.951H174.061a14.959,14.959,0,0,1-14.59-11.666,15.117,15.117,0,0,1-.361-3.285V321.49l.361-.263,64.207-46.99,4.166-3.052a21.274,21.274,0,0,1,25.128,0l4.175,3.052Z"
                transform="translate(-94.624 -158.833)"
                fill="#1e88e5"
              />
              <rect
                width="43.136"
                height="9.423"
                rx="4.712"
                transform="translate(98.783 47.614)"
                fill="#42a5f5"
              />
              <rect
                width="98.6"
                height="4.714"
                rx="2.357"
                transform="translate(98.783 64.653)"
                fill="#e0e0e0"
              />
              <rect
                width="66.59"
                height="4.714"
                rx="2.357"
                transform="translate(98.71 75.944)"
                fill="#e0e0e0"
              />
              <rect
                width="79.097"
                height="4.714"
                rx="2.357"
                transform="translate(98.71 87.236)"
                fill="#e0e0e0"
              />
              <path
                d="M460.7,377.873a8.916,8.916,0,0,1-6.451-2.763l-32.4-33.981a8.916,8.916,0,1,1,12.905-12.305l25.452,26.7,45.49-55.3a8.919,8.919,0,1,1,13.78,11.328L467.6,374.627a8.917,8.917,0,0,1-6.562,3.242Z"
                transform="translate(-249.414 -176.608)"
                fill="#9ed85b"
              />
              <path
                d="M256.675,402.106H205.089a4.523,4.523,0,0,0-4.519-4.523V379.709a4.519,4.519,0,0,0,4.519-4.519h51.586a4.519,4.519,0,0,0,4.519,4.519v17.873A4.523,4.523,0,0,0,256.675,402.106Z"
                transform="translate(-119.28 -223.127)"
                fill="#1976d2"
              />
              <rect
                width="31.718"
                height="3.988"
                rx="1.994"
                transform="translate(91.349 160.78)"
                fill="#1565c0"
              />
              <rect
                width="20.257"
                height="2.801"
                rx="1.4"
                transform="translate(91.349 167.456)"
                fill="#1565c0"
              />
            </svg>
          </div>

          <div className="text-center text-2xl font-bold mt-20">Email Verification</div>
          <p className="text-center text-sm mt-5 ">
            Your email has been verified. You can continue using the application.
          </p>
          <button
            className="mt-5 btn bg-purple-primary w-full hover:bg-purple-primary-darker"
            type="button"
            onClick={() => {
              navigate('/login');
            }}
          >
            Back To Login
          </button>
        </div>
      </div>
    </section>
  );
}
