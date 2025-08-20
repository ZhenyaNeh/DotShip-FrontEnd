// // Возвращает начальную конфигурацию кораблей для игры.
// export function getSetupShips() {
//   return [
//     [
//       { id: 6, x: -1, y: -1, w: 0, h: 0, health: 1 },
//       { id: 7, x: -1, y: -1, w: 0, h: 0, health: 1 },
//       { id: 8, x: -1, y: -1, w: 0, h: 0, health: 1 },
//       { id: 9, x: -1, y: -1, w: 0, h: 0, health: 1 },
//     ],
//     [
//       { id: 3, x: -1, y: -1, w: 1, h: 0, health: 2 },
//       { id: 4, x: -1, y: -1, w: 1, h: 0, health: 2 },
//       { id: 5, x: -1, y: -1, w: 1, h: 0, health: 2 },
//     ],
//     [
//       { id: 1, x: -1, y: -1, w: 2, h: 0, health: 3 },
//       { id: 2, x: -1, y: -1, w: 2, h: 0, health: 3 },
//     ],
//     [{ id: 0, x: -1, y: -1, w: 3, h: 0, health: 4 }],
//   ];
// }

// export function getShipsForRandom() {
//   return [
//     { id: 6, x: -1, y: -1, w: 0, h: 0, health: 1 },
//     { id: 7, x: -1, y: -1, w: 0, h: 0, health: 1 },
//     { id: 8, x: -1, y: -1, w: 0, h: 0, health: 1 },
//     { id: 9, x: -1, y: -1, w: 0, h: 0, health: 1 },
//     { id: 3, x: -1, y: -1, w: 1, h: 0, health: 2 },
//     { id: 4, x: -1, y: -1, w: 1, h: 0, health: 2 },
//     { id: 5, x: -1, y: -1, w: 1, h: 0, health: 2 },
//     { id: 1, x: -1, y: -1, w: 2, h: 0, health: 3 },
//     { id: 2, x: -1, y: -1, w: 2, h: 0, health: 3 },
//     { id: 0, x: -1, y: -1, w: 3, h: 0, health: 4 },
//   ];
// }

export function getStartupShips() {
  return [
    { id: 9, cords: { x: -10, y: -10, w: 0, h: 0 }, health: 1 },
    { id: 8, cords: { x: -10, y: -10, w: 0, h: 0 }, health: 1 },
    { id: 7, cords: { x: -10, y: -10, w: 0, h: 0 }, health: 1 },
    { id: 6, cords: { x: -10, y: -10, w: 0, h: 0 }, health: 1 },
    { id: 5, cords: { x: -10, y: -10, w: 1, h: 0 }, health: 2 },
    { id: 4, cords: { x: -10, y: -10, w: 1, h: 0 }, health: 2 },
    { id: 3, cords: { x: -10, y: -10, w: 1, h: 0 }, health: 2 },
    { id: 2, cords: { x: -10, y: -10, w: 2, h: 0 }, health: 3 },
    { id: 1, cords: { x: -10, y: -10, w: 2, h: 0 }, health: 3 },
    { id: 0, cords: { x: -10, y: -10, w: 3, h: 0 }, health: 4 },
  ];
}
