import React from 'react';
import './app.scss';

import { Game } from './components/game/Game';
import { Tabs } from './components/tabs/Tabs';
import { AppFooter } from './components/appFooter/AppFooter';

export const App = () => {
  return (
    <div className="app">
      <main className="app__content">
        <Game />
        <Tabs />
      </main>
      <AppFooter />
    </div>
  );
}
