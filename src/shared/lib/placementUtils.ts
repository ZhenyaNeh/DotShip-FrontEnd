import { ShipCordType, ShipType } from '@/src/entities/Ship';
import { Cell } from '@/src/entities/Ship/model/types/shipTypes';

// Возвращает: true, если точка за пределами поля, иначе false
export function outOfBounds({ x, y }: Cell): boolean {
  return x < 0 || y < 0 || x > 9 || y > 9;
}

export function shipInBoard({ x, y, w, h }: ShipCordType) {
  return !outOfBounds({ x, y }) && !outOfBounds({ x: x + h, y: y + w });
}
export function getNormalizedCords({ x, y, w, h }: ShipCordType): ShipCordType {
  return { x: Math.min(x, 9 - h), y: Math.min(y, 9 - w), w, h };
}

export function equalsCell(a: Cell, b: Cell): boolean {
  return a.x === b.x && a.y === b.y;
}

export function shipOverlaps(cords1: ShipCordType, cords2: ShipCordType) {
  // Расширяем зону проверки на 1 клетку во все стороны
  const ship1StartX = cords1.x - 1;
  const ship1StartY = cords1.y - 1;
  const ship1EndX = cords1.x + (cords1.h || 0) + 1;
  const ship1EndY = cords1.y + (cords1.w || 0) + 1;

  const ship2StartX = cords2.x;
  const ship2StartY = cords2.y;
  const ship2EndX = cords2.x + (cords2.h || 0);
  const ship2EndY = cords2.y + (cords2.w || 0);

  // Проверяем пересечение расширенной зоны первого корабля
  // с фактической зоной второго корабля
  return !(
    ship1EndX < ship2StartX ||
    ship1StartX > ship2EndX ||
    ship1EndY < ship2StartY ||
    ship1StartY > ship2EndY
  );
}

export function canPlaceShip(
  shipPositions: ShipType[],
  ship: ShipType
): boolean {
  // Проверка выхода за границы доски
  if (!shipInBoard(ship.cords)) {
    return false;
  }

  for (const shipInner of shipPositions) {
    if (shipInner.id !== ship.id && shipOverlaps(shipInner.cords, ship.cords)) {
      return false;
    }
  }
  return true;
}

export function canRotate(board: ShipType[], ship: ShipType): boolean {
  const rotationShip: ShipType = {
    ...ship,
    cords: {
      ...ship.cords,
      w: ship.cords.h,
      h: ship.cords.w,
    },
  };

  return canPlaceShip(board, rotationShip) && shipInBoard(rotationShip.cords);
}

// Возвращает корабль, который находится в точке (hoverX, hoverY)
export function getWreckedShip(
  board: ShipType[],
  cordCheck: ShipCordType
): ShipType | undefined {
  return board.find(({ cords }) => !shipOverlaps(cordCheck, cords));
}

export function placeShipsRandomly(ships: ShipType[]): ShipType[] {
  const boardSize = 10;
  const maxGlobalAttempts = 100;
  let globalAttempts = 0;

  while (globalAttempts < maxGlobalAttempts) {
    const placedShips: ShipType[] = [];
    const shipsToPlace = ships.map(ship => ({ ...ship }));
    let allShipsPlaced = true;

    for (const ship of shipsToPlace) {
      const length = ship.health;
      let placed = false;
      let placementAttempts = 0;
      const maxPlacementAttempts = 100;

      while (!placed && placementAttempts < maxPlacementAttempts) {
        placementAttempts++;
        const isHorizontal = Math.random() > 0.5;
        const maxX = isHorizontal ? boardSize - 1 : boardSize - length;
        const maxY = isHorizontal ? boardSize - length : boardSize - 1;

        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));

        const newShip: ShipType = {
          ...ship,
          cords: {
            x,
            y,
            w: isHorizontal ? length - 1 : 0,
            h: isHorizontal ? 0 : length - 1,
          },
        };

        if (canPlaceShip(placedShips, newShip)) {
          placedShips.push(newShip);
          placed = true;
        }
      }

      if (!placed) {
        allShipsPlaced = false;
        break;
      }
    }

    if (allShipsPlaced) {
      return placedShips;
    }

    globalAttempts++;
  }

  throw new Error(
    `Не удалось разместить все корабли после ${maxGlobalAttempts} попыток`
  );
}
