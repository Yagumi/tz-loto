export const createFieldData = () => {
  let count = 1;
  return new Array(45).fill('').map(item => {
    const newItem = {
      id: count,
      text: count,
      isActive: false,
    }

    count++

    return newItem;
  })
}
