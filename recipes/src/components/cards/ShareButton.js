import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

export function CopyURL(address) {
  window.navigator.clipboard.writeText(address);
}

function localizaAddress() {
  return window.location.origin;
}

function removeDescription(setCopy){
  setCopy(false);
}

export default function ShareOption(props) {
  const { index, copy, setCopy } = props;

  return (
    <Link
      onClick={() => {
        setCopy(true);
        CopyURL(`${localizaAddress()}/${props.item.type}s/${props.item.id}`);
        setTimeout(()=>removeDescription(setCopy),3000)
      }}
    >
      <div>
        <img       
          src={shareIcon}
          alt="Share Icon"          
        />
        {copy ? <span>Link copiado!</span> : null}
      </div>
    </Link>
  );
}

ShareOption.propTypes = {
  item: propTypes.instanceOf(Object).isRequired,
  index: propTypes.number.isRequired,
  copy: propTypes.string.isRequired,
  setCopy: propTypes.func.isRequired,
};