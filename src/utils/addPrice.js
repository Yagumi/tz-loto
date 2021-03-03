export function addPrice(tabs, activeTabId, price) {
  return tabs.map(tab => {
    if (tab.id === activeTabId) {
      tab.price = price;
    }

    return tab;
  })
} 