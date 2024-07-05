import React, { createContext, useState, useContext } from 'react';

const maxIdContext = createContext();

export const MaxIdProvider = ({ children }) => {
  const [maxId, setMaxId] = useState(0);

  return (
    <maxIdContext.Provider value={{ maxId, setMaxId }}>
      {children}
    </maxIdContext.Provider>
  );
};

export const useMaxId = () => useContext( maxIdContext );
