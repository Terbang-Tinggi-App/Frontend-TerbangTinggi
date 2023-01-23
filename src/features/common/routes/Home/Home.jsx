import React from 'react';

import FeatureSection from './FeatureSection';
import Inspiration from './Inspiration';
import { Layout } from '../../../../components/Layout';
import SearchFlightsForm from '../../../../components/Input/SearchFlightsForm';

export function Home() {
  const bgStyles = {
    backgroundImage: `url(https://images.unsplash.com/photo-1437846972679-9e6e537be46e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80)`,
    backgroundColor: '  rgba(0, 0, 0, 0.20)',
    backgroundBlendMode: 'multiply',
    objectPosition: 'center',
    objectFit: 'cover',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <Layout>
      <section className="flex flex-col items-center md:py-20 py-8" style={bgStyles}>
        <div className="flex flex-col items-center">
          <h1 className="font-bold mx-4 text-4xl lg:text-5xl text-white bg-clip-text bg-gradient-to-tr from-[#0b6cff] to-[#512bd4] p-2">
            Find best ticket price for your next journey
          </h1>
          <div className="bg-white rounded-md shadow-md md:w-auto w-11/12 my-8 p-8">
            <SearchFlightsForm />
          </div>
        </div>
      </section>

      <Inspiration />
      <FeatureSection />
    </Layout>
  );
}
