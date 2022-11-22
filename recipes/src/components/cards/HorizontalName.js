import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function HorizontalName(props) {
  const { index, item } = props;
  const { type, name } = item;
  return (
    <Link to={`/${type}s/${item.id}`}>
      <p>{name}</p>
    </Link>
  );
}
HorizontalName.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
};