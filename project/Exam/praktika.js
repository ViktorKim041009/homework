function addSquare(arr) {
  return arr.map(el => el + el * el);
}

// Пример
let a = [1, 2, 3, 4];
let b = addSquare(a);  // b = [2, 6, 12, 20], a = [1, 2, 3, 4]