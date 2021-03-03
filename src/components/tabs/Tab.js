import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import './tab.scss';

import { selectTab, toggleActiveTab } from '../../store/tabsSlice';

export const Tab = React.memo(({ id, text, selectedNumbers, isActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectTab(id));
    dispatch(toggleActiveTab(id));
  };

  return (
    <div className="tabs__item  tab">
      <button
        className={`
          ${isActive
            ? "tab__btn  tab__btn--active"
            : "tab__btn"
          }
        `}
        onClick={handleClick}
      >
        {text}
      </button>
      <ul className="tab__list">
        {selectedNumbers && selectedNumbers.map(({ id, number }) => (
          <li
            className="tab__item"
            key={id}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
})

Tab.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selectedNumbers: PropTypes.arrayOf(PropTypes.object),
  isActive: PropTypes.bool.isRequired,
}