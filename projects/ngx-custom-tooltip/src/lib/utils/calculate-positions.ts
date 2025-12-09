import { PopUpPositionKey, SimpleRect } from '../models/pop-up-position.models';

export function isEqualRect(a: SimpleRect, b: SimpleRect): boolean {
  return (
    a.top === b.top &&
    a.right === b.right &&
    a.bottom === b.bottom &&
    a.left === b.left &&
    a.width === b.width &&
    a.height === b.height &&
    a.x === b.x &&
    a.y === b.y
  );
}

/**
 * Calcula la posición `top` del pop-up según la posición seleccionada.
 */
export function calculatePopUpTopPosition(
  targetBounding: DOMRect,
  popUpBounding: DOMRect,
  floatingSize: number,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const position: Record<PopUpPositionKey, string> = {
    topStart: `${targetBounding.top - popUpBounding.height - floatingSize}px`,
    topCenter: `${targetBounding.top - popUpBounding.height - floatingSize}px`,
    topEnd: `${targetBounding.top - popUpBounding.height - floatingSize}px`,
    rightStart: `${targetBounding.top - 11 - displacement}px`,
    rightCenter: `${
      targetBounding.top + targetBounding.height / 2 - popUpBounding.height / 2
    }px`,
    rightEnd: `${
      targetBounding.bottom - popUpBounding.height + 10 + displacement
    }px`,
    bottomStart: `${targetBounding.bottom + floatingSize}px`,
    bottomCenter: `${targetBounding.bottom + floatingSize}px`,
    bottomEnd: `${targetBounding.bottom + floatingSize}px`,
    leftStart: `${targetBounding.top - 11 - displacement}px`,
    leftCenter: `${
      targetBounding.top + targetBounding.height / 2 - popUpBounding.height / 2
    }px`,
    leftEnd: `${
      targetBounding.bottom - popUpBounding.height + 10 + displacement
    }px`,
  };
  return position[popUpPosition];
}

/**
 * Calcula la posición `left` del pop-up según la posición seleccionada.
 */
export function calculatePopUpLeftPosition(
  targetBounding: DOMRect,
  popUpBounding: DOMRect,
  floatingSize: number,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const setPopUpLeftPosition: Record<PopUpPositionKey, string> = {
    topStart: `${targetBounding.left - 10 - displacement}px`,
    topCenter: `${
      targetBounding.left + targetBounding.width / 2 - popUpBounding.width / 2
    }px`,
    topEnd: `${
      targetBounding.right - popUpBounding.width + 10 + displacement
    }px`,
    rightStart: `${targetBounding.right + floatingSize}px`,
    rightCenter: `${targetBounding.right + floatingSize}px`,
    rightEnd: `${targetBounding.right + floatingSize}px`,
    bottomStart: `${targetBounding.left - 10 - displacement}px`,
    bottomCenter: `${
      targetBounding.left + targetBounding.width / 2 - popUpBounding.width / 2
    }px`,
    bottomEnd: `${
      targetBounding.right - popUpBounding.width + 11 + displacement
    }px`,
    leftStart: `${targetBounding.left - popUpBounding.width - floatingSize}px`,
    leftCenter: `${targetBounding.left - popUpBounding.width - floatingSize}px`,
    leftEnd: `${targetBounding.left - popUpBounding.width - floatingSize}px`,
  };
  return setPopUpLeftPosition[popUpPosition];
}

/**
 * Calcula la posición `top` del triángulo del pop-up según la posición seleccionada.
 */
export function calculateTriangleTopPosition(
  targetBounding: DOMRect,
  popUpBounding: DOMRect,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const position: Record<PopUpPositionKey, string> = {
    topStart: 'auto',
    topCenter: 'auto',
    topEnd: 'auto',
    bottomStart: '3px',
    bottomCenter: '3px',
    bottomEnd: '3px',
    leftStart: `${targetBounding.height / 2 + 3 + displacement}px`,
    leftCenter: `${popUpBounding.height / 2 - 8}px`,
    leftEnd: 'auto',
    rightStart: `${targetBounding.height / 2 + 3 + displacement}px`,
    rightCenter: `${popUpBounding.height / 2 - 5}px`,
    rightEnd: 'auto',
  };
  return position[popUpPosition];
}

/**
 * Calcula la posición `top` del triángulo del pop-up según la posición seleccionada.
 */
export function calculateTriangleBottomPosition(
  targetBounding: DOMRect,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const position: Record<PopUpPositionKey, string> = {
    topStart: '3px',
    topCenter: '3px',
    topEnd: '3px',
    bottomStart: 'auto',
    bottomCenter: 'auto',
    bottomEnd: 'auto',
    leftStart: 'auto',
    leftCenter: 'auto',
    leftEnd: `${targetBounding.height / 2 + 5 + displacement}px`,
    rightStart: 'auto',
    rightCenter: 'auto',
    rightEnd: `${targetBounding.height / 2 + 5 + displacement}px`,
  };
  return position[popUpPosition];
}

/**
 * Calcula la posición `left` del triángulo del pop-up según la posición seleccionada.
 */
export function calculateTriangleLeftPosition(
  targetBounding: DOMRect,
  popUpBounding: DOMRect,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const position: Record<PopUpPositionKey, string> = {
    topStart: `${targetBounding.width / 2 + 4 + displacement}px`,
    topCenter: `${popUpBounding.width / 2 - 7}px`,
    topEnd: 'auto',
    bottomStart: `${targetBounding.width / 2 + 4 + displacement}px`,
    bottomCenter: `${popUpBounding.width / 2 - 6}px`,
    bottomEnd: 'auto',
    leftStart: 'auto',
    leftCenter: 'auto',
    leftEnd: 'auto',
    rightStart: '3px',
    rightCenter: '3px',
    rightEnd: '3px',
  };
  return position[popUpPosition];
}

/**
 * Calcula la posición `right` del triángulo del pop-up según la posición seleccionada.
 */
export function calculateTriangleRightPosition(
  targetBounding: DOMRect,
  displacement: number,
  popUpPosition: PopUpPositionKey,
): string {
  const position: Record<PopUpPositionKey, string> = {
    topStart: 'auto',
    topCenter: 'auto',
    topEnd: `${targetBounding.width / 2 + 3 + displacement}px`,
    bottomStart: 'auto',
    bottomCenter: 'auto',
    bottomEnd: `${targetBounding.width / 2 + 3 + displacement}px`,
    leftStart: '3px',
    leftCenter: '3px',
    leftEnd: '3px',
    rightStart: 'auto',
    rightCenter: 'auto',
    rightEnd: 'auto',
  };
  return position[popUpPosition];
}
