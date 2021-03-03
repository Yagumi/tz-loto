import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

import { createTabsData } from '../utils/createTabsData';
import { getRandom } from '../utils/getRandom';
import { recursionN, recursionK } from '../utils/getRecursions';
import { addPrice } from '../utils/addPrice';
import { getTotalPrice } from '../utils/getTotalPrice';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    tabs: createTabsData(),
    activeTab: {
      id: 0,
      text: 'A',
    },
    price: 0,
    minPrice: 50,
    maxPrice: 250000,
    maxNumbers: 15,
  },
  reducers: {
    selectTab: (state, { payload }) => {
      const newTab = state.tabs.find(({ id }) => id === payload);
      state.activeTab = { id: newTab.id, text: newTab.text };
    },
    toggleActiveTab: (state, { payload }) => {
      state.tabs.map(tab => {
        if (tab.id === payload) {
          tab.isActive = true;
        } else {
          tab.isActive = false;
        }

        return tab;
      })
    },
    toggleNumber: (state, { payload }) => {
      let tabNumbers = state.tabs[state.activeTab.id].numbers;
      let tabSelectedNumbers = state.tabs[state.activeTab.id].selectedNumbers;



      tabNumbers = tabNumbers
        .map(({ id, text, isActive }) => {
          const newItem = { id, text, isActive }

          if (id === payload) {
            if (isActive) {
              newItem.isActive = false;
              tabSelectedNumbers = tabSelectedNumbers
                .filter(({ number }) => (
                  number !== payload
                ));
            } else {

              //Preventing next step when limit is break
              if (tabSelectedNumbers.length >= state.maxNumbers) return newItem;

              newItem.isActive = true;
              tabSelectedNumbers = [
                ...tabSelectedNumbers, {
                  id: uuidv4(),
                  number: payload,
                }
              ]
            }
          }

          return newItem;
        }
        );

      state.tabs[state.activeTab.id].selectedNumbers = tabSelectedNumbers;
      state.tabs[state.activeTab.id].numbers = tabNumbers;
    },
    chooseRandomNumbers: (state, action) => {
      //Clear previous selected numbers
      state.tabs[state.activeTab.id].numbers = state.tabs[state.activeTab.id].numbers.map((number) => {
        number.isActive = false;
        return number;
      })

      let newSelectedNumbers = new Set();

      while (newSelectedNumbers.size <= 5) {
        const randomNumber = getRandom(1, 45);
        newSelectedNumbers.add(randomNumber)

      }

      //Add id
      newSelectedNumbers = Array.from(newSelectedNumbers).map(number => ({ id: uuidv4(), number }));
      state.tabs[state.activeTab.id].selectedNumbers = newSelectedNumbers;

      //Add Price
      state.tabs = addPrice(state.tabs, state.activeTab.id, state.minPrice);
      state.price = getTotalPrice(state.tabs);

      //colorize new selected numbers
      state.tabs[state.activeTab.id].numbers = state.tabs[state.activeTab.id].numbers.map((number) => {
        for (const item in newSelectedNumbers) {
          if (newSelectedNumbers[item].number === number.text) {
            number.isActive = true;
          }
        }

        return number
      })

      //colorize default tab button
      state.tabs[state.activeTab.id].isActive = true;
    },
    calculatePrice: (state, action) => {
      const currentTab = state.tabs.find(tab => tab.id === state.activeTab.id);
      const numbersLength = currentTab.selectedNumbers.length;

      if (numbersLength < 6) {
        state.tabs = addPrice(state.tabs, state.activeTab.id, 0);
        state.price = getTotalPrice(state.tabs);
      }

      if (numbersLength === 6) {
        state.tabs = addPrice(state.tabs, state.activeTab.id, state.minPrice);
        state.price = getTotalPrice(state.tabs);
      }

      if (numbersLength > 6) {
        const n = numbersLength;
        const k = numbersLength - 6;

        //Formula for a price calculation
        const price = (recursionN(n, k)) / (recursionK(k)) * state.minPrice;

        state.tabs = addPrice(state.tabs, state.activeTab.id, price);
        state.price = getTotalPrice(state.tabs);
      }
    },
    clearAll: (state, action) => {
      state.tabs = createTabsData();
      state.activeTab = { id: 0, text: 'A' };
      state.price = 0;
    }
  }
});

export const selectTabs = ({ tabs }) => tabs.tabs;
export const selectActiveTabNumbers = ({ tabs }) => tabs.tabs[tabs.activeTab.id].numbers;
export const selectPrice = ({ tabs }) => tabs.price;
export const selectSelectedNumbers = ({ tabs }) => tabs.tabs[tabs.activeTab.id].selectedNumbers;

export const tabsReducer = tabsSlice.reducer;
export const {
  selectTab,
  toggleNumber,
  toggleActiveTab,
  chooseRandomNumbers,
  clearAll,
  calculatePrice,
} = tabsSlice.actions;
