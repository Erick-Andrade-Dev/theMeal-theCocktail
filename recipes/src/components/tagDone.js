import React from 'react';
import PropTypes from 'prop-types';

export default function Tags(props) {
  const { index, tagName } = props;
  return (
    <div>
      <p>{tagName}</p>
    </div>
  );
}

Tags.propTypes = {
  index: PropTypes.number.isRequired,
  tagName: PropTypes.string.isRequired,
};