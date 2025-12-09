export type PopUpPositionKebabCaseKey =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'left-start'
  | 'left-center'
  | 'left-end';

export type PopUpPositionKey =
  | 'topStart'
  | 'topCenter'
  | 'topEnd'
  | 'rightStart'
  | 'rightCenter'
  | 'rightEnd'
  | 'bottomStart'
  | 'bottomCenter'
  | 'bottomEnd'
  | 'leftStart'
  | 'leftCenter'
  | 'leftEnd';

export interface SimpleRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  x: number;
  y: number;
}
