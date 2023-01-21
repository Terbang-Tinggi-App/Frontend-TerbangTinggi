import React from 'react';
import { Link } from 'react-router-dom';

import { today } from '../../utils/dates';
import useHistorySearch from '../../hooks/useHistorySearch';

const DESTINATIONS = [
  {
    name: 'Bali',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672397732/terbangtinggi/hero-background/sebastian-pena-lambarri-U_i6h9Y50wQ-unsplash_1_wdu82n.jpg',
    iata: 'DPS'
  },
  {
    name: 'Bandung',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672397737/terbangtinggi/hero-background/erik-setia-murdani-25sT5gonUfo-unsplash_1_ih0xfn.jpg',
    iata: 'BDO'
  },
  {
    name: 'Jogja',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672397734/terbangtinggi/hero-background/angga-kurniawan-CzQaFeSYzcI-unsplash_1_v1dzvn.jpg',
    iata: 'JOG'
  },
  {
    name: 'Lombok',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672398478/terbangtinggi/hero-background/tandya-rachmat-18CyoDR6q2w-unsplash_1_fhrto0.jpg',
    iata: 'LOP'
  },
  {
    name: 'Malang',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672385126/terbangtinggi/hero-background/pukpik-aB46yUmsMp0-unsplash_1_pojqkb.jpg',
    iata: 'MLG'
  },
  {
    name: 'Raja Ampat',
    image:
      'https://res.cloudinary.com/dmgrxm78p/image/upload/v1672398049/terbangtinggi/hero-background/ridho-ibrahim-Q5dKAbRfPN0-unsplash_1_btgyxb.jpg',
    iata: 'RJM'
  }
];

function Inspiration() {
  const { departure: historyDeparture, startDate } = useHistorySearch();

  const departure = historyDeparture?.value ?? 'CGK';

  return (
    <section className="bg-slate-100 px-8 pt-16 pb-24">
      <h2 className="text-3xl font-bold text-center my-8">Fly to these popular destinations</h2>
      <p className="text-center my-8">
        Need some inspiration where to go? This is some of the most popular destinations in
        Indonesia
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {DESTINATIONS.map((place) => (
          <Link
            className="card w-96 bg-base-100 shadow-xl image-full"
            key={place.name}
            to={`/search?departure=${departure}&arrival=${
              place.iata
            }&passengers=1&tripType=one_way&sc=economy&date=${startDate ?? today}`}
          >
            <figure>
              <img src={place.image} alt={place.name} />
            </figure>
            <div className="card-body flex justify-center items-center">
              <h2 className="card-title">{place.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Inspiration;
