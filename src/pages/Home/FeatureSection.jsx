import React from 'react';

const FEATURES_DATA = [
  {
    icon: <WalletIcon />,
    title: 'Various Payment Methods',
    content: 'We accept wide range payment methods world wide.'
  },
  {
    icon: <DollarIcon />,
    title: 'No Hidden Fee',
    content: 'Book with no worries. No hidden fee is added to your order.'
  },
  {
    icon: <RefundIcon />,
    title: 'Refundable',
    content: "Suddenly can't fly? Don't worry, some of our tickets is Refundable."
  }
];

function FeatureSection() {
  return (
    <section className="container mx-auto my-8 max-w-[1280px]">
      <div className="xl:h-[700px] flex flex-col justify-center">
        <div className="mb-8 text-center mx-4">
          <h2 className="text-3xl font-bold my-8">Why Terbang Tinggi?</h2>
          <p>Why choose with Terbang Tinggi? These are the features that we offer</p>
        </div>
        <div className="flex justify-center xl:justify-between mx-4 flex-wrap items-center gap-4 flex-col xl:flex-row">
          {FEATURES_DATA.map((item) => (
            <FeatureCard
              key={item.title}
              icon={item.icon}
              content={item.content}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;

export function WalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="dodgerblue"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  );
}

export function DollarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="orange"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function RefundIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="limegreen"
      className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
      />
    </svg>
  );
}

export function FeatureCard({ icon, title, content }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md shadow-indigo-100">
      {icon}
      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{title}</h3>
      <p className="mb-3 font-normal text-gray-500">{content}</p>
    </div>
  );
}
