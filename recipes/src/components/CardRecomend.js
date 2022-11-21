import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function CardRecomend(props) {
  const { title, index, source, show, location, id } = props;
  let visible = false;
  if (index % 6 === show % 6 || index === (show + 1) % 6) {
    visible = true;
  }
  const tipo = /bebidas/.test(location.pathname) ? 'comidas' : 'bebidas';

  return (
    <div style={visible ? null : { display: 'none' }}>
      <Link style={{textDecoration:'none'}} to={`/${tipo}/${id}`}>
        <img          
          className="image-sugestion"    
          src={source}
          alt="Sugestão"          
          style={{ width: '100%' }}
        />
        <p className="title-sugestion">
          {title}
        </p>
      </Link>
    </div>
  );
}

CardRecomend.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  show: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};