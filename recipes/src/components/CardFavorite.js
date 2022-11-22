import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import HorizontalName from './cards/HorizontalName';
import ShareOption from './cards/ShareButton';
import ImageTop from './cards/ImageTop';

export function CopyURL(address) {
  window.navigator.clipboard.writeText(address);
}

export function desFavorite(id) {
  let favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  favorite = favorite.filter((el) => el.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
}

export default function CardFavorite(props) {
  const { id, type, area, category, alcoholicOrNot } = props.item;
  const { index, item } = props;
  const [copy, setCopy] = useState(false);
  const isMeal = type === 'comida';
  return (
    <div>
      <ImageTop item={item} index={index} />
      <div>
        <div className="infos-favorites">
          {isMeal ? (
            <p>{`${area} - ${category}`}</p>
          ) : (
            <p>{alcoholicOrNot}</p>
          )}
          <div className="container-icons">
            <ShareOption index={index} copy={copy} item={item} setCopy={setCopy} />
            <Link onClick={() => desFavorite(id)}>
              <img
                src={blackHeart}
                alt="like icon"                                    
              />
            </Link>
          </div>          
          <HorizontalName item={item} index={index} />
        </div>
      </div>
    </div>
  );
}

CardFavorite.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};