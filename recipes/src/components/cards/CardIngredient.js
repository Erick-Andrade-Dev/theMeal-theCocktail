import React from 'react';
import PropTypes from 'prop-types';

const CardIngredient = (props) => {
  const { title, image, index } = props;
  return (
    <div id={title}>
      <img src={image} alt={title}/>
      <p>{title}</p>
    </div>
  );
};

export default CardIngredient;

CardIngredient.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};