import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ImageTop(props) {
  const { id, type, name, image } = props.item;
  const { index } = props;
  return (
    <Link to={`/${type}s/${id}`}>
      <img              
        src={image}
        alt={name}        
      />
    </Link>
  );
}

ImageTop.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};