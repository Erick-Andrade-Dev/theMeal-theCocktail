import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from '../../context/ReceitasContext';

export default function ButtonSearch(props) {
  const { setchangeFilter, changeFilter } = useContext(ReceitasContext);

  return (
    <div>
      <button    
        className="button-search"    
        type="button"            
        onClick={ () => {
          props.automatic(true);
          setchangeFilter(changeFilter + 1);
        } }
      >
        Buscar
      </button>
    </div>
  );
}

ButtonSearch.propTypes = { 
  automatic: PropTypes.bool.isRequired 
};