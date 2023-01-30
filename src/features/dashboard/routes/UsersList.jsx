import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import { axios } from '@/lib/axios';
import Spinner from '@/components/Layout/Spinner';
import { Dashboard } from '@/components/Layout';

export function UsersList() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`/admin/data/?page=${page}`);
        setUser(res.data.rows);
        setTotalPage(res.data.totalPage);
      } catch (error) {
        toast(error.response.data.message);
      }
    }

    getData();
    setRefresh(false);
  }, [page, refresh]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/admin/data/${id}`);
      toast(res?.message);
      setRefresh(true);
    } catch (error) {
      toast(error.message);
    }
  };

  const handlePageClick = (val) => {
    setPage(val.selected + 1);
  };

  return (
    <Dashboard>
      <div className="px-5 mt-10">
        {user ? (
          <>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg border-2">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Username
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Created At
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Updated At
                    </th>
                    <th scope="col" className="py-3 px-6">
                      <span className="sr-only">Delete</span>
                    </th>
                    <th scope="col" className="py-3 px-6">
                      <span className="sr-only">Detail</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((x) => (
                    <tr key={x.id} className="bg-white border-b hover:bg-gray-50">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                        {x.username}
                      </th>

                      <td className="py-4 px-6">{x.email}</td>
                      <td className="py-4 px-6">{new Date(x.createdAt).toDateString()}</td>
                      <td className="py-4 px-6">{new Date(x.updatedAt).toDateString()}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          className="font-medium bg-red-500 px-5 py-2 rounded-lg text-white"
                          onClick={() => {
                            handleDelete(x.id);
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              previousLabel="previous"
              nextLabel="next"
              breakLabel="..."
              pageCount={totalPage}
              onPageChange={handlePageClick}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              breakClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              containerClassName="inline-flex -space-x-px "
              previousClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            />
          </>
        ) : (
          <Spinner textContent="Getting list users" />
        )}
      </div>
    </Dashboard>
  );
}
