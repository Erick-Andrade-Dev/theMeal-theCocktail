import React, { useState } from 'react';
import propTypes from 'prop-types';
import Tags from './tagDone';
import HorizontalName from './cards/HorizontalName';
import ShareOption from './cards/ShareButton';
import ImageTop from './cards/ImageTop';

export function CopyURL(address) {
  window.navigator.clipboard.writeText(address);
}
export default function CardDone(props) {
  const { type, area, category, alcoholicOrNot, doneDate, tags } = props.item;
  const { index, item } = props;
  const [copy, setCopy] = useState(false);
  const isMeal = type === 'comida';
  return (
    <div>
      <ImageTop item={item} index={index} />
      <div>
        <div>
          {isMeal ? (
            <p>{`(${area} - ${category})`}</p>
          ) : (
            <p>({alcoholicOrNot})</p>
          )}
          <HorizontalName item={item} index={index} />
          <ShareOption index={index} copy={copy} item={item} setCopy={setCopy} />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <span>Feita em: </span>{' '}
          <span>{doneDate}</span>
        </div>
        {isMeal ? tags.map((tagName) => <Tags key={tagName} tagName={tagName} index={index} />) : null}
      </div>
    </div>
  );
}

CardDone.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};