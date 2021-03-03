import React from 'react'
import { useDispatch } from 'react-redux';
import PropsType from 'prop-types';

import { toggleNumber, calculatePrice, } from '../../../store/tabsSlice';

export const FieldItem = React.memo(({ id, isActive, text }) => {
  const dispatch = useDispatch();

  const handleChoose = () => {
    dispatch(toggleNumber(id));
    dispatch(calculatePrice());
  }

  return (
    <div
      className={`field__item ${isActive && 'field__item--active'}`}
      onClick={handleChoose}
    >
      {text}
    </div>
  )
})


FieldItem.propsType = {
  id: PropsType.number.isRequired,
  isActive: PropsType.bool.isRequired,
  text: PropsType.string.isRequired,
}