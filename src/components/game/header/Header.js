import React from 'react';
import { useDispatch } from 'react-redux';
import './header.scss';

import { Button } from '../../button/Button';

import { chooseRandomNumbers } from '../../../store/tabsSlice';

export const Header = () => {
  const dispatch = useDispatch();

  const handleRandom = () => dispatch(chooseRandomNumbers());

  return (
    <header className="game__header header">
      <Button
        clsName="header__random"
        text="Случайные числа"
        handleClick={handleRandom}
      />
    </header>
  )
}
