import React from 'react';

import { Layout } from '../../../components/Layout';
import profile1 from '../../../components/img/1.jpg';
import profile2 from '../../../components/img/2.jpg';
import profile3 from '../../../components/img/3.jpeg';
import profile5 from '../../../components/img/5.jpg';
import profile6 from '../../../components/img/6.jpg';

export function AboutUs() {
  return (
    <Layout>
      <section className="min-h-screen mx-16 md:mx-60 my-8">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <div className="flex flex-col flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Overview</h2>
            <p className="text-justify">
              This website is intended for completed platinum challenge from Study Independen at
              Binar Academy, which is part of Kampus Merdeka by Kemendikbud.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">The Challenges</h2>
            <p className="text-justify">
              In this platinum challenge, we are collaborating with Backend and Frontend students to
              build a <span className="font-medium">Flights Booking App</span> and we named it{' '}
              <span className="font-medium">Terbang Tinggi</span>.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Tech Stack</h2>
            <p>This app is build using these technology</p>
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>Tailwind</li>
              <li>Redux</li>
              <li>Express</li>
              <li>Postgresql</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">The Teams</h2>
            <div className="flex items-center justify-center gap-4 flex-wrap flex-col">
              <div className="flex flex-wrap items-center justify-between gap-8">
                <div>
                  <figure>
                    <img
                      src={profile1}
                      alt="John Tri Putra Sihombing Backend"
                      className="rounded-lg w-64 h-64 object-cover"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>John Tri Putra Sihombing &bull; Backend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src={profile2}
                      alt="Muhammad Umar Mansyur Backend"
                      className="rounded-lg w-64 h-64 object-cover"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>Muhammad Umar Mansyur&bull; Backend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src={profile3}
                      alt="Achmad Fadilla Backend"
                      className="rounded-lg w-64 h-64 object-cover"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>Achmad Fadilla &bull; Backend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672659371/terbangtinggi/aroyan_iitxzz.jpg"
                      alt="Aroyan Bakti S Frontend"
                      className="rounded-lg w-64 h-64 object-cover"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>Aroyan Bakti S &bull; Frontend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src={profile5}
                      alt="Frans Glendly Manuel S. Frontend"
                      className="rounded-lg w-64 h-64 object-cover"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>Frans Glendly Manuel S. &bull; Frontend</figcaption>
                  </figure>
                </div>
                <div>
                  <figure>
                    <img
                      src={profile6}
                      alt="Muhammad Rizky P.S Frontend"
                      className="rounded-lg w-64 h-64 object-cover object-top"
                      height={256}
                      width={256}
                      loading="lazy"
                    />
                    <figcaption>Muhammad Rizky P.S &bull; Frontend</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
