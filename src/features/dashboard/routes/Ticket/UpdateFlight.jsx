import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import { Dashboard } from '@/components/Layout';
import { AirlineSelect, FormControl, Input, Label, SeatClassSelect } from '@/components/Input';
import { VStack } from '@/components/Container';
import Spinner from '@/components/Layout/Spinner';

export function UpdateFlight() {
  const [data, setData] = useState(null);
  const [airline, setAirline] = useState(
    JSON.stringify({ name: data?.airlineName, iata: data?.airlineIata })
  );
  const [seatClass, setSeatClass] = useState('economy');
  const [capacity, setCapacity] = useState(1);

  const airlineParsed = JSON.parse(airline);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_API_URL}/flight/data/${id}`,
        {
          ...data,
          airlineName: airlineParsed.name,
          airlineIata: airlineParsed.iata,
          sc: seatClass,
          capacity: Number(capacity),
          code: airlineParsed.iata + data.code
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      const status = await response.status;

      if (status === 201 || status === 200) {
        toast('Flight successfully updated', { type: 'success' });
        navigate('/dashboard/flights');
      }
    } catch (err) {
      toast(err.message, { type: 'error' });
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/flight/data/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        });
        setData(res.data.data);
        setAirline(
          JSON.stringify({ name: res.data.data.airlineName, iata: res.data.data.airlineIata })
        );
        setSeatClass(res.data.data.sc);
        setCapacity(Number(res.data.data.capacity));
      } catch (err) {
        toast(err.message, { type: 'error' });
      }
    };
    getData();
  }, []);

  return (
    <Dashboard>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl">Update Flight</h1>
        {data ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex gap-4 flex-wrap mx-4">
              <VStack>
                <FormControl>
                  <Label>Code</Label>
                  <label className="input-group">
                    <span className="bg-brand-lighter-900 text-white font-semibold">
                      {airlineParsed.iata}
                    </span>
                    <Input
                      variant="primary"
                      type="text"
                      placeholder="312"
                      name="code"
                      className="max-w-[250px]"
                      onChange={handleChange}
                      value={data?.code.split(airlineParsed.iata)[1]}
                      maxLength={3}
                    />
                  </label>
                </FormControl>
              </VStack>
              <VStack>
                <Label>Airline</Label>
                <AirlineSelect onChange={(e) => setAirline(e.target.value)} value={airline} />
              </VStack>
              <VStack>
                <FormControl>
                  <Label>Seat Class</Label>
                  <SeatClassSelect
                    onChange={(e) => setSeatClass(e.target.value)}
                    value={seatClass}
                  />
                </FormControl>
              </VStack>
              <VStack>
                <FormControl>
                  <Label>Seat Capacity</Label>
                  <Input
                    variant="primary"
                    type="number"
                    min={0}
                    max={1000}
                    className="w-full max-w-xs appearance-none"
                    onChange={(e) => setCapacity(e.target.value)}
                    name="capacity"
                    value={capacity}
                  />
                </FormControl>
              </VStack>
              <VStack>
                <Label>Airport Departure</Label>
                <input
                  type="text"
                  placeholder="Airport Departure"
                  name="departureAirport"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.departureAirport}
                  disabled
                />
              </VStack>
              <VStack>
                <Label>Airport IATA Departure</Label>
                <input
                  type="text"
                  placeholder="Airport IATA Departure"
                  name="departure"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.departure}
                  maxLength={3}
                  disabled
                />
              </VStack>
              <VStack>
                <Label>Airport Arrival</Label>
                <input
                  type="text"
                  placeholder="Airport Arrival"
                  name="arrivalAirport"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.arrivalAirport}
                  disabled
                />
              </VStack>
              <VStack>
                <Label>Airport IATA Arrival</Label>
                <input
                  type="text"
                  placeholder="Arrival Airport IATA"
                  name="arrival"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.arrival}
                  maxLength={3}
                  disabled
                />
              </VStack>
              <VStack>
                <Label>Date</Label>
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.date}
                />
              </VStack>
              <VStack>
                <Label>Time Departure</Label>
                <input
                  type="time"
                  placeholder="Time Departure"
                  name="departureTime"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.departureTime}
                />
              </VStack>{' '}
              <VStack>
                <Label>Time Arrival</Label>
                <input
                  type="time"
                  placeholder="Time Arrival"
                  name="arrivalTime"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.arrivalTime}
                />
              </VStack>
              <VStack>
                <Label>Price</Label>
                <input
                  type="number"
                  placeholder="1000000"
                  name="price"
                  className="input input-primary"
                  onChange={handleChange}
                  value={data?.price}
                />
              </VStack>
              <div className="w-full">
                <div className="flex items-center mt-6 gap-2 justify-end">
                  <button
                    type="button"
                    className="btn btn-primary w-32"
                    onClick={handleUpdateTicket}>
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-outline w-32"
                    onClick={() => {
                      navigate('/dashboard/flights');
                    }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <Spinner textContent="Getting flight detail" />
        )}
      </div>
    </Dashboard>
  );
}
