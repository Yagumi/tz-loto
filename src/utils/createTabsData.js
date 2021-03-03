import { createFieldData } from './createFieldData';

export const createTabsData = () => {
  let count = 0;
  const tabs = ['A', 'Б', 'В', "Г", "Д", "Е"];

  return tabs.map(tab => {
    const newTab = {
      id: count,
      text: tab,
      numbers: createFieldData(),
      selectedNumbers: [],
      isActive: false,
      price: 0,
    }

    count++

    return newTab;
  })
}
