import React, { createContext, useState, useContext } from 'react';

const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [id, setId] = useState(0);

  return (
    <IdContext.Provider value={{ id, setId}}>
      {children}
    </IdContext.Provider>
  );
};

export const useId = () => useContext(IdContext);
