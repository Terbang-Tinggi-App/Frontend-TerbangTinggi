import React from 'react';

export function Layout({ children }) {
  return (
    <div className="flex h-screen flex-row-reverse">
      <div className="w-full md:w-6/12 flex flex-col justify-center items-center mx-8">
        {children}
      </div>
      <div className="hidden md:block w-6/12 object-cover bg-cover bg-no-repeat bg-center bg-[url(https://images.unsplash.com/photo-1660587624398-aa9ce06fd3f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1440&q=100)]" />
    </div>
  );
}
