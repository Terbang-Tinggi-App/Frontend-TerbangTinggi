import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { BASE_API_URL } from '@/config';
import { Layout } from '@/components/Layout';
import Spinner from '@/components/Layout/Spinner';
import Protected from '@/components/Routes/Protected';

export function DetailTransaction() {
  const [detail, setDetail] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${BASE_API_URL}/transaction/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    axios(config)
      .then((response) => {
        setDetail(response.data.data.detail_transaction[0]);
      })
      .catch((error) => {
        toast(error);
      });
  }, []);

  return (
    <Protected>
      <Layout>
        <main className="min-h-screen my-4">
          {detail ? (
            <>
              <h1 className="text-2xl text-center py-5 font-serif">Detail History Transaction</h1>
              <table className="w-full  text-sm text-left  text-gray-500 dark:text-gray-400 ">
                <tbody className="grid place-content-center">
                  {detail.passenger?.map((x) => (
                    <div className="my-5" key={x.firstName}>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Full Name
                        </th>
                        <td className="py-4 px-6">
                          {x.firstName} {x.lastName}
                        </td>
                      </tr>
                      <tr className="bg-white  dark:bg-gray-800">
                        <th
                          scope="row"
                          className="py-4 px-6 flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Nationality ID
                        </th>
                        <td className=" py-4 px-6">{x.travelDocument}</td>
                      </tr>
                      <tr className="bg-white dark:bg-gray-800">
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          Type
                        </th>
                        <td className="py-4 px-6">{x.type}</td>
                      </tr>
                      <br />
                    </div>
                  ))}
                </tbody>
              </table>
              <div className="w-full flex justify-center items-center">
                <a href={detail?.tiket[0]?.ticket_pdf} className="mx-auto">
                  <span className="font-medium bg-green-500 px-5 text-center py-2 w-40 rounded-lg text-white  hover:underline">
                    Download Tiket
                  </span>
                </a>
              </div>
            </>
          ) : (
            <Spinner textContent="Getting your transaction" />
          )}
        </main>
      </Layout>
    </Protected>
  );
}
