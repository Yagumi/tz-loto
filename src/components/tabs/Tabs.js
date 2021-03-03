import React from 'react';
import { useSelector } from 'react-redux';
import './tabs.scss';

import { selectTabs } from '../../store/tabsSlice';
import { Tab } from './Tab';

export const Tabs = () => {
  const tabs = useSelector(selectTabs)

  return (
    <div className="tabs">
      {tabs.map(tab => <Tab key={tab.id} {...tab} />)}
    </div>
  )
}
