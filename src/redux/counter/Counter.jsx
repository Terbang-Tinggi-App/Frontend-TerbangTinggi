import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { increment, decrement } from './counter.slice';

function Counter() {
  const { value } = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center gap-4 p-4">
      <button className="btn btn-circle" onClick={() => dispatch(increment())} type="button">
        +
      </button>{' '}
      <p className="text-2xl">Value {value}</p>
      <button className="btn btn-circle" onClick={() => dispatch(decrement())} type="button">
        -
      </button>
    </div>
  );
}

export default Counter;
