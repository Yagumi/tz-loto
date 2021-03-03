export function getTotalPrice(state, flag) {
  let totalPrice = 0;

  state.forEach(({ price }) => totalPrice += price);
  return totalPrice;
}