import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Dashboard } from '../../../components/Layout';
import {
  AirlineSelect,
  AirportSelect,
  FormControl,
  Input,
  Label,
  SeatClassSelect,
  TripTypeSelect
} from '../../../components/Input';
import { VStack } from '../../../components/Container';
import { today } from '../../../utils/dates';

const initialData = {
  code: '',
  airlineName: '',
  departureAirport: '',
  departure: '',
  arrivalAirport: '',
  arrival: '',
  date: today,
  returnDate: '',
  departureTime: '06:00:00',
  arrivalTime: '07:00:00',
  price: +''
};

export default function CreateTicket() {
  const [data, setData] = useState(initialData);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [airline, setAirline] = useState(JSON.stringify({ name: 'Garuda Indonesia', iata: 'GA' }));
  const [seatClass, setSeatClass] = useState('economy');
  const [tripType, setTripType] = useState('one_way');
  const [capacity, setCapacity] = useState(1);

  const airlineParsed = JSON.parse(airline);

  const navigate = useNavigate();

  const reqBody = {
    code: airlineParsed.iata + data.code,
    airlineIata: airlineParsed.iata,
    airlineName: airlineParsed.name,
    departureAirport: departure?.airportName,
    departure: departure?.value,
    arrivalAirport: arrival?.airportName,
    arrival: arrival?.value,
    date: data.date,
    departureTime: data.departureTime,
    arrivalTime: data.arrivalTime,
    price: data.price,
    sc: seatClass,
    tripType,
    capacity
  };

  const body =
    tripType === 'one_way'
      ? {
          ...reqBody
        }
      : {
          ...reqBody,
          returnDate: data.returnDate
        };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/flight/data`,
        {
          ...body
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      const status = await response.status;

      if (status === 201 || status === 200) {
        toast('Ticket successfully created');
      }
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <Dashboard>
      <div className="p-8">
        <h1 className="text-3xl">Create Flight</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-4 flex-wrap mx-4">
            <div className="flex flex-wrap gap-4">
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
                      value={data.code}
                      maxLength={3}
                    />
                  </label>
                </FormControl>
              </VStack>
              <VStack>
                <FormControl>
                  <Label>Airline</Label>
                  <AirlineSelect onChange={(e) => setAirline(e.target.value)} />
                </FormControl>
              </VStack>
              <VStack>
                <FormControl>
                  <Label>Seat Class</Label>
                  <SeatClassSelect onChange={(e) => setSeatClass(e.target.value)} />
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
                  />
                </FormControl>
              </VStack>
            </div>
            <VStack>
              <FormControl>
                <Label>Trip Type</Label>
                <TripTypeSelect onChange={(e) => setTripType(e.target.value)} />
              </FormControl>
            </VStack>
            <VStack>
              <div className="sm:w-[250px] w-full">
                <FormControl>
                  <Label>Departure</Label>
                  <AirportSelect
                    placeholder="Where from?"
                    value={departure}
                    onChange={setDeparture}
                  />
                </FormControl>
              </div>
            </VStack>
            <VStack>
              <div className="sm:w-[250px] w-full">
                <FormControl>
                  <Label>Arrival</Label>
                  <AirportSelect placeholder="Where to?" value={arrival} onChange={setArrival} />
                </FormControl>
              </div>
            </VStack>
            <VStack>
              <FormControl>
                <Label>Date</Label>
                <Input
                  variant="primary"
                  type="date"
                  placeholder="Date"
                  name="date"
                  onChange={handleChange}
                  value={data.date}
                  min={today}
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl>
                <Label>Return Date</Label>
                <Input
                  variant="primary"
                  type="date"
                  placeholder="Return Date"
                  name="returnDate"
                  onChange={handleChange}
                  value={data.returnDate}
                  disabled={tripType === 'one_way'}
                  min={today}
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl>
                <Label>Departure Time</Label>
                <Input
                  variant="primary"
                  type="time"
                  placeholder="Time Departure"
                  name="departureTime"
                  onChange={handleChange}
                  value={data.departureTime}
                />
              </FormControl>
            </VStack>{' '}
            <VStack>
              <FormControl>
                <Label>Arrival Time</Label>
                <Input
                  variant="primary"
                  type="time"
                  placeholder="Time Arrival"
                  name="arrivalTime"
                  onChange={handleChange}
                  value={data.arrivalTime}
                />
              </FormControl>
            </VStack>
            <VStack>
              <FormControl>
                <Label>Price</Label>
                <Input
                  variant="primary"
                  type="number"
                  placeholder="1000000"
                  name="price"
                  onChange={handleChange}
                  value={data.price}
                />
              </FormControl>
            </VStack>
            <div className="w-full">
              <div className="flex items-center mt-6 justify-end gap-4">
                <button type="button" className="btn btn-primary w-32" onClick={handleAddTicket}>
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-outline w-32"
                  onClick={() => navigate('/flights')}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}
