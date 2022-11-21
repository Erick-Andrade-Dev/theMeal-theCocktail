import React, { useContext } from 'react';
import ReceitasContext from '../../context/ReceitasContext';

export default function Search() {
  const { setSearchValue } = useContext(ReceitasContext);

  return (
    <input      
      className="input-search"
      type="text"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}