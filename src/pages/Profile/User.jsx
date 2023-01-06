import React, { useEffect, useState } from 'react';
import { AiOutlinePhone, AiOutlineUser, AiOutlineMail, AiOutlineGlobal } from 'react-icons/ai';
import axios from 'axios';
import { FaCity } from 'react-icons/fa';
import { BsFillPinMapFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { Layout } from '../../components/Layout';
import Spinner from '../../components/Layout/Spinner';
import Protected from '../../components/Routes/Protected';

const API_URL = import.meta.env.VITE_BASE_URL;

function User() {
  const [formData, setFormData] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const config = {
      method: 'patch',
      url: `${API_URL}/user/updateProfile/`,
      data: {
        gender: formData.gender,
        country: formData.country,
        address: formData.address,
        phone: formData.phone,
        province: formData.province,
        city: formData.city
      },
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    };

    axios(config)
      .then((response) => {
        toast(response.data.message);
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/user/myProfile`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setFormData(data.data);
    })();
  }, []);

  return (
    <Protected>
      <Layout>
        {formData ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center  md:py-10  px-5">
              <form className="w-full">
                <div>
                  <h1 className="font-bold text-2xl">Person Detail</h1>
                  <div className="form-group flex flex-col mt-5">
                    <label htmlFor="username">Username</label>
                    <div className="relative flex ">
                      <input
                        id="Username"
                        type="text"
                        name="username"
                        className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                        placeholder="username"
                        onChange={handleChange}
                        value={formData.username}
                        disabled
                      />
                      <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                        <AiOutlineUser className=" mx-5 mt-2" size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group flex flex-col mt-5">
                    <label htmlFor="address">Address</label>
                    <div className="relative flex ">
                      <input
                        id="address"
                        type="text"
                        name="address"
                        className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                        placeholder="address"
                        onChange={handleChange}
                        value={formData.address}
                      />
                      <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                        <AiOutlineUser className=" mx-5 mt-2" size={20} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group flex flex-col mt-5">
                    <label htmlFor="emergencynumber">Email</label>
                    <div className="relative flex ">
                      <input
                        id="email"
                        type="text"
                        name="email"
                        className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                        placeholder="Emergency Number"
                        onChange={handleChange}
                        value={formData.email}
                        disabled
                      />
                      <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                        <AiOutlineMail className=" mx-5 mt-2" size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group flex flex-col mt-5">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="relative flex ">
                      <input
                        id="phone"
                        type="text"
                        name="phone"
                        className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                        placeholder={formData.phone}
                        onChange={handleChange}
                        value={formData.phone}
                      />
                      <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                        <AiOutlinePhone className=" mx-5 mt-2" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group flex flex-col mt-5">
                  <label htmlFor="emergencynumber">Country</label>
                  <div className="relative flex ">
                    <input
                      id="country"
                      type="text"
                      name="country"
                      className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                      placeholder="country"
                      onChange={handleChange}
                      value={formData.country}
                      required
                    />
                    <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                      <AiOutlineGlobal className=" mx-5 mt-2" size={20} />
                    </div>
                  </div>
                </div>
                <div className="form-group flex flex-col mt-5">
                  <label htmlFor="username">Province</label>
                  <div className="relative flex ">
                    <input
                      id="province"
                      type="text"
                      name="province"
                      className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                      placeholder="province"
                      onChange={handleChange}
                      value={formData.province}
                    />
                    <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                      <BsFillPinMapFill className=" mx-5 mt-2" size={20} />
                    </div>
                  </div>
                </div>
                <div className="form-group flex flex-col mt-5">
                  <label htmlFor="username">City</label>
                  <div className="relative flex ">
                    <input
                      id="city"
                      type="text"
                      name="city"
                      className="px-20 border w-full rounded focus:outline-0  py-1 border-slate-500 required:red-border-500"
                      placeholder="city"
                      onChange={handleChange}
                      value={formData.city}
                    />
                    <div className="absolute bg-[#7E56DA] rounded text-white h-full w-16 ">
                      <FaCity className=" mx-5 mt-2" size={20} />
                    </div>
                  </div>
                </div>

                <div className="form-group mt-5">
                  <h1 className="font-bold text-2xl">Gender</h1>
                  <fieldset className="flex flex-col gap-2">
                    <div className="flex">
                      <div className="mt-1">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          onChange={handleChange}
                          checked={formData.gender === 'Male'}
                        />
                        <label htmlFor="male" className="ml-1">
                          Male
                        </label>
                      </div>
                      <div className="ml-10 mt-1">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          onChange={handleChange}
                          checked={formData.gender === 'Female'}
                        />
                        <label htmlFor="female" className="ml-1">
                          Female
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="flex ">
                  <div className="form-group mt-5 ml-auto">
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                      onClick={save}>
                      Save
                    </button>
                  </div>
                  <div className="form-group mt-5  ">
                    <Link to="/">
                      <button
                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        type="button">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Spinner textContent="Getting your profile" />
        )}
      </Layout>
    </Protected>
  );
}

export default User;
