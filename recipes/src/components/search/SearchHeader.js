import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HeaderSearch from './Header';
import Search from './Search';
import Options from './Options';
import ButtonSearch from './ButtonSearch'

export default function SearchHeader(props) {
  const [showSearch, setShowSearch] = useState(false);
  const update = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div>
      <HeaderSearch title={ props.title } setShowSearch={ update } showSearch={ showSearch }/>
      <div className="container-search">
        {showSearch ? <Search /> : null}
        {showSearch ? <Options /> : null}
        {showSearch ? <ButtonSearch automatic={ props.automatic } /> : null}
      </div>
    </div>
  );
}

SearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
  automatic: PropTypes.bool.isRequired,
};