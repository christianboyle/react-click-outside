import React, { Component, useRef, useCallback, useEffect, useState } from 'react';
import { render } from 'react-dom';
import './style.css';

const useClickOutside = (cb, dep) => {
  const ref = useRef(null);
  const callback = useCallback(cb, dep);

  useEffect(() => {
    const listener = (e) => {
      if(!ref.current?.contains(e.target)) {
        callback(e);
      }
    };

    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [ref, callback]);

  return ref;
}

const App = () => {
  const [count, setCount] = useState(0);
  const ref = useClickOutside(() => setCount(c => c + 1), []);
  return <div className="target" ref={ref}>Outside clicks: {count}</div>;
}

render(<App />, document.getElementById('root'));
