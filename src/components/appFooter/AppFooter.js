import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './appFooter.scss';

import { Button } from '../button/Button';

import {
  selectPrice,
  clearAll,
} from '../../store/tabsSlice';

export const AppFooter = () => {
  const price = useSelector(selectPrice);
  const dispatch = useDispatch();
  const handleClear = () => dispatch(clearAll())

  return (
    <div className="app__footer  footer">
      <p>Стоимость {price} руб.</p>
      <Button
        clsName="footer__clear"
        text="Очистить все"
        handleClick={handleClear}
      />
    </div>
  )
}
