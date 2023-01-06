import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TiArrowBack } from 'react-icons/ti';
import { IoCreate } from 'react-icons/io5';
import { MdUpdate } from 'react-icons/md';
import { FiMapPin } from 'react-icons/fi';
import { FaCity } from 'react-icons/fa';
import { FcGlobe } from 'react-icons/fc';
import { BsFillPinMapFill, BsTelephonePlusFill } from 'react-icons/bs';

import Protected from '../../components/Routes/Protected';
import Spinner from '../../components/Layout/Spinner';

const API_URL = import.meta.env.VITE_BASE_URL;

export default function Detail() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${API_URL}/admin/data/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    axios(config)
      .then((response) => {
        setDetail(response.data.data.detail_user);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <Protected access="Admin">
      {detail ? (
        <>
          <h1 className="text-2xl text-center mt-5 font-serif	">Detail User</h1>
          <div className="px-20 py-5 drop-shadow-xl ">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg drop-shadow-md">
              <table className="w-full text-sm text-left text-gray-500">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className=" flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <IoCreate size={20} className="mr-2 text-blue-500" />
                      Created
                    </th>
                    <td className="py-4 px-6">{detail.createdAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className=" flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <MdUpdate size={20} className="mr-2 text-green-500" />
                      Updated
                    </th>
                    <td className="py-4 px-6">{detail.updatedAt}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex  py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <FiMapPin size={20} className="mr-2 text-red-500" />
                      Address
                    </th>
                    <td className="py-4  px-6">{detail.address}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <FcGlobe size={20} className="mr-2" />
                      Country
                    </th>
                    <td className="py-4 px-6">{detail.country}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <FaCity size={20} className="mr-2 text-emerald-900" />
                      City
                    </th>
                    <td className="py-4 px-6">{detail.city}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <BsFillPinMapFill size={20} className="text-indigo-500 mr-2" />
                      Province
                    </th>
                    <td className="py-4 px-6">{detail.province}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex py-4 px-5 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20pt"
                        height="20pt"
                        className="mr-2"
                        version="1.1"
                        viewBox="0 0 1200 1200">
                        <g>
                          <path d="m689.91 124.18c0 50.629-41.039 91.668-91.668 91.668-50.625 0-91.668-41.039-91.668-91.668 0-50.625 41.043-91.668 91.668-91.668 50.629 0 91.668 41.043 91.668 91.668" />
                          <path d="m605.96 681.67v415.95c0 29.051 23.555 52.609 52.621 52.609 29.051 0 52.609-23.555 52.609-52.609l-0.003906-711.11c0-5.3867 4.3438-9.7422 9.7422-9.7422 5.3633 0 9.7422 4.3672 9.7422 9.7422l-0.43359 256.27c0 22.02 17.844 39.852 39.863 39.852 21.996 0 39.84-17.832 39.84-39.852l0.007813-274.6c0-71.004-57.574-128.58-128.58-128.58l-60.336-0.58984c-7.5352 0-13.633 6.1094-13.633 13.645z" />
                          <path d="m392.71 773.16 116.45-400.3c0.43359-1.1172 0.66016-2.3047 0.66016-3.5508 0-5.5078-4.4766-9.9844-9.9727-9.9844-4.3438 0-8.0508 2.7617-9.4219 6.625l-70.031 243.45c-4.3906 16.703-19.609 29.027-37.691 29.027-21.516 0-38.965-17.449-38.965-38.965 0-5.375 1.1055-10.5 3.0703-15.156l72.898-237.14c7.7891-54.059 63.996-108.13 123.73-108.13h31.812c7.5234 0 13.633 6.1094 13.633 13.645l0.32422 850.43c0 24.203-19.633 43.812-43.836 43.812s-43.836-19.621-43.836-43.812l0.003906-315.32-98.172 0.046875c-6.1914 0-11.207-5.0156-11.207-11.219 0-1.2031 0.17969-2.3672 0.55078-3.4453z" />
                        </g>
                      </svg>
                      Gender
                    </th>
                    <td className="py-4 px-6">{detail.gender}</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <th
                      scope="row"
                      className="flex py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <BsTelephonePlusFill size={20} className="mr-2 text-teal-500" />
                      Phone
                    </th>
                    <td className="py-4 px-6">{detail.phone}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-right mr-20">
            <Link to="/users">
              <button
                type="button"
                className=" text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex mb-2">
                <TiArrowBack />
                Back
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Spinner textContent="Getting user data" />
      )}
    </Protected>
  );
}
