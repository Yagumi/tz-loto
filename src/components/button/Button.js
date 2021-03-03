import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ clsName, text, imgUrl, handleClick }) => {
  return (
    <button className={clsName} onClick={handleClick}>
      {imgUrl && <img src={imgUrl} alt={text} />}
      <p>{text}</p>
    </button>
  )
}

Button.propTypes = {
  clsName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  handleClick: PropTypes.func.isRequired
}