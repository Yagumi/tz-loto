import React from 'react'
import { useSelector } from 'react-redux';
import './field.scss';

import { selectActiveTabNumbers } from '../../../store/tabsSlice';
import { FieldItem } from './FieldItem';

export const Field = () => {
  const fieldList = useSelector(selectActiveTabNumbers);

  return (
    <ul className="game__field  field">
      {fieldList.map(({ id, text, isActive }) => (
        <FieldItem
          key={id}
          id={id}
          text={text}
          isActive={isActive}
        />
      ))}
    </ul>
  )
}
