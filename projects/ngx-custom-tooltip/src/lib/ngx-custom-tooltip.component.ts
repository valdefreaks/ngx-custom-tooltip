import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

interface SimpleRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

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

type PopUpPositionKebabCaseKey =
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

function isEqualRect(a: SimpleRect, b: SimpleRect): boolean {
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

@Component({
  selector: 'ngx-custom-tooltip',
  templateUrl: './ngx-custom-tooltip.component.html',
  styleUrls: ['./ngx-custom-tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCustomTooltipComponent implements OnChanges, AfterViewInit {
  /**
   * Color de fondo del tooltip (`background-color`).
   * @default "#ffffff"
   */
  @Input() bgColor = '#ffffff';

  /**
   * Color del borde del tooltip (`border-color`).
   * @default "#d3d3d3"
   */
  @Input() borderColor = '#d3d3d3';

  /**
   * Radio del borde del tooltip (`border-radius`). Acepta cualquier sintaxis CSS válida.
   * @default "4px"
   */
  @Input() borderRadius = '4px';

  /**
   * Indica si el tooltip muestra un botón de cierre.
   * Si es `false`, el tooltip se cierra al hacer click fuera.
   * @default false
   */
  @Input() closeButton = false;

  /**
   * Ruta de la imagen que se usa como icono del botón de cierre.
   * Si no se provee, se muestra solo el área clickable sin imagen.
   * @default undefined
   */
  @Input() closeButtonImage?: string;

  /**
   * Separación del botón de cierre respecto a los bordes (top/right).
   * Acepta cualquier sintaxis CSS válida.
   * @default "20px"
   */
  @Input() closeButtonMargin = '20px';

  /**
   * Tamaño del botón de cierre (`height` y `width`).
   * Acepta cualquier sintaxis CSS válida.
   * @default "20px"
   */
  @Input() closeButtonSize = '20px';

  /**
   * Desplazamiento adicional del tooltip respecto a su target.
   * No se aplica para posiciones de tipo `*Center` (por ejemplo `topCenter`).
   * @default 0
   */
  @Input() displacement = 0;

  /**
   * Distancia mínima entre el tooltip y su elemento objetivo.
   * Controla cuánto “flota” el tooltip separado del target.
   * @default 3
   */
  @Input() floatingSize = 3;

  /**
   * Altura máxima del tooltip. Al superarla, aparece un scroll vertical.
   * Acepta cualquier sintaxis CSS válida.
   * @default "max-content"
   */
  @Input() maxHeight = 'max-content';

  /**
   * Anchura máxima del tooltip. Al superarla, aparece un scroll horizontal.
   * Acepta cualquier sintaxis CSS válida.
   * @default "max-content"
   */
  @Input() maxWidth = 'max-content';

  /**
   * Altura mínima del tooltip.
   * Acepta cualquier sintaxis CSS válida.
   * @default "auto"
   */
  @Input() minHeight = 'auto';

  /**
   * Anchura mínima del tooltip.
   * Acepta cualquier sintaxis CSS válida.
   * @default "auto"
   */
  @Input() minWidth = 'auto';

  /**
   * Relleno interno del contenido del tooltip (`padding`).
   * Acepta cualquier sintaxis CSS válida.
   * @default "8px"
   */
  @Input() padding = '8px';

  /**
   * Posición del tooltip respecto a su elemento objetivo.
   * Valores válidos:
   * `topStart`, `topCenter`, `topEnd`,
   * `bottomStart`, `bottomCenter`, `bottomEnd`,
   * `leftStart`, `leftCenter`, `leftEnd`,
   * `rightStart`, `rightCenter`, `rightEnd`.
   * @default "topCenter"
   */
  @Input() popUpPosition: PopUpPositionKey = 'topCenter';

  /**
   * Elemento HTML que actúa como referencia/target del tooltip.
   * Si `closeButton` es `false`, este elemento se excluye del click-out que cierra el tooltip.
   * @default undefined
   */
  @Input() target?: HTMLElement;

  /**
   * Color de fondo específico para el triángulo del tooltip.
   * Si no se define, se usa el mismo color que `bgColor`.
   * @default undefined
   */
  @Input() triangleBgColor?: string;

  /**
   * Evento emitido cuando el tooltip se cierra.
   * Emite siempre `false` al cerrarse.
   */
  @Output() closeEmitter: EventEmitter<boolean> = new EventEmitter();

  /**
   * ElementRef del pop-up HTML.
   */
  @ViewChild('popUp', { static: false }) popUpElement?: ElementRef<HTMLElement>;

  /**
   * Medidas y posición del pop-up
   */
  private popUpBounding?: DOMRect;

  /**
   * Medidas y posición del target
   */
  private targetBounding?: DOMRect;

  /**
   * Posición `top` del pop-up en formato CSS respecto a la página.
   */
  popUpTopProperty?: string;

  /**
   * Posición `left` del pop-up en formato CSS respecto a la página.
   */
  popUpLeftProperty?: string;

  /**
   * Posición `top` del triángulo del pop-up en formato CSS respecto a la página.
   */
  triangleTopPosition?: string;

  /**
   * Posición `left` del triángulo del pop-up en formato CSS respecto a la página.
   */
  triangleLeftPosition?: string;

  /**
   * Posición `bottom` del triángulo del pop-up en formato CSS respecto a la página.
   */
  triangleBottomPosition?: string;

  /**
   * Posición `right` del triángulo del pop-up en formato CSS respecto a la página.
   */
  triangleRightPosition?: string;

  /**
   * Posición `right` del triángulo del pop-up en formato CSS respecto a la página.
   */
  mappedPopUpPosition?: PopUpPositionKebabCaseKey;

  /*
   * Escucha los clicks en el documento para cerrar el pop-up si se hace click fuera.
   */
  @HostListener('document:click', ['$event'])
  clickOut(e: MouseEvent): void {
    if (
      !this.closeButton &&
      this.popUpElement &&
      e.target !== this.popUpElement.nativeElement &&
      e.target !== this.target
    ) {
      this.closePopUp();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.checkForPositionChanges();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.checkForPositionChanges();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  /**
   * Revisa si han cambiado las entradas que podrían afectar a la posición del pop-up.
   */
  ngOnChanges(): void {
    this.displacement = !isNaN(+this.displacement)
      ? Number(this.displacement)
      : 0;
    this.mappedPopUpPosition = this.mappingPopUpPositionToCssClass();
    this.checkForPositionChanges();
  }

  ngAfterViewInit(): void {
    this.checkForPositionChanges();
  }

  closePopUp(): void {
    this.closeEmitter.emit(false);
  }

  /*
   * Revisa si ha habido cambios en la posición o tamaño del target o del pop-up.
   */
  checkForPositionChanges(): void {
    if (!this.target) {
      console.warn('target not provided for NgxCustomTooltipComponent');
    }
    if (!this.target || !this.popUpElement) {
      return;
    }
    /*
     * Si no se han establecido las medidas aún, se establecen.
     */
    if (!this.targetBounding || !this.popUpBounding) {
      this.setPositions();
    } else {
      /*
       * Se establecen las medidas solo si han cambiado.
       */
      const last = (): SimpleRect => {
        const { top, right, bottom, left, width, height, x, y } =
          this.targetBounding!;
        return { top, right, bottom, left, width, height, x, y };
      };
      const news = (): SimpleRect => {
        const { top, right, bottom, left, width, height, x, y } =
          this.target!.getBoundingClientRect();
        return { top, right, bottom, left, width, height, x, y };
      };

      if (!isEqualRect(last(), news())) {
        this.setPositions();
      }
    }
  }

  setPositions(): void {
    this.targetBounding = this.target!.getBoundingClientRect();
    const popUpNative: HTMLElement = this.renderer.selectRootElement(
      this.popUpElement!.nativeElement,
      true,
    );

    this.popUpBounding = popUpNative.getBoundingClientRect();
    this.popUpTopProperty = this.calculatePopUpTopPosition();
    this.popUpLeftProperty = this.calculatePopUpLeftPosition();
    this.triangleTopPosition = this.calculateTriangleTopPosition();
    this.triangleBottomPosition = this.calculateTriangleBottomPosition();
    this.triangleLeftPosition = this.calculateTriangleLeftPosition();
    this.triangleRightPosition = this.calculateTriangleRightPosition();
    this.cdr.detectChanges();
  }

  handleStopEvents(event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Calcula la posición `top` del pop-up según la posición seleccionada.
   */
  private calculatePopUpTopPosition(): string {
    const setPopUpTopPosition: Record<PopUpPositionKey, string> = {
      topStart: `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
      topCenter: `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
      topEnd: `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
      rightStart: `${this.targetBounding!.top - 11 - this.displacement}px`,
      rightCenter: `${
        this.targetBounding!.top +
        this.targetBounding!.height / 2 -
        this.popUpBounding!.height / 2
      }px`,
      rightEnd: `${
        this.targetBounding!.bottom -
        this.popUpBounding!.height +
        10 +
        this.displacement
      }px`,
      bottomStart: `${this.targetBounding!.bottom + this.floatingSize}px`,
      bottomCenter: `${this.targetBounding!.bottom + this.floatingSize}px`,
      bottomEnd: `${this.targetBounding!.bottom + this.floatingSize}px`,
      leftStart: `${this.targetBounding!.top - 11 - this.displacement}px`,
      leftCenter: `${
        this.targetBounding!.top +
        this.targetBounding!.height / 2 -
        this.popUpBounding!.height / 2
      }px`,
      leftEnd: `${
        this.targetBounding!.bottom -
        this.popUpBounding!.height +
        10 +
        this.displacement
      }px`,
    };
    return setPopUpTopPosition[this.popUpPosition];
  }

  /**
   * Calcula la posición `left` del pop-up según la posición seleccionada.
   */
  private calculatePopUpLeftPosition(): string {
    const setPopUpLeftPosition: Record<PopUpPositionKey, string> = {
      topStart: `${this.targetBounding!.left - 10 - this.displacement}px`,
      topCenter: `${
        this.targetBounding!.left +
        this.targetBounding!.width / 2 -
        this.popUpBounding!.width / 2
      }px`,
      topEnd: `${
        this.targetBounding!.right -
        this.popUpBounding!.width +
        10 +
        this.displacement
      }px`,
      rightStart: `${this.targetBounding!.right + this.floatingSize}px`,
      rightCenter: `${this.targetBounding!.right + this.floatingSize}px`,
      rightEnd: `${this.targetBounding!.right + this.floatingSize}px`,
      bottomStart: `${this.targetBounding!.left - 10 - this.displacement}px`,
      bottomCenter: `${
        this.targetBounding!.left +
        this.targetBounding!.width / 2 -
        this.popUpBounding!.width / 2
      }px`,
      bottomEnd: `${
        this.targetBounding!.right -
        this.popUpBounding!.width +
        11 +
        this.displacement
      }px`,
      leftStart: `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
      leftCenter: `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
      leftEnd: `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
    };
    return setPopUpLeftPosition[this.popUpPosition];
  }

  /**
   * Calcula la posición `top` del triángulo del pop-up según la posición seleccionada.
   */
  private calculateTriangleTopPosition(): string {
    const position: Record<PopUpPositionKey, string> = {
      topStart: 'auto',
      topCenter: 'auto',
      topEnd: 'auto',
      bottomStart: '3px',
      bottomCenter: '3px',
      bottomEnd: '3px',
      leftStart: `${this.targetBounding!.height / 2 + 3 + this.displacement}px`,
      leftCenter: `${this.popUpBounding!.height / 2 - 8}px`,
      leftEnd: 'auto',
      rightStart: `${this.targetBounding!.height / 2 + 3 + this.displacement}px`,
      rightCenter: `${this.popUpBounding!.height / 2 - 5}px`,
      rightEnd: 'auto',
    };
    return position[this.popUpPosition];
  }

  /**
   * Calcula la posición `top` del triángulo del pop-up según la posición seleccionada.
   */
  private calculateTriangleBottomPosition(): string {
    const position: Record<PopUpPositionKey, string> = {
      topStart: '3px',
      topCenter: '3px',
      topEnd: '3px',
      bottomStart: 'auto',
      bottomCenter: 'auto',
      bottomEnd: 'auto',
      leftStart: 'auto',
      leftCenter: 'auto',
      leftEnd: `${this.targetBounding!.height / 2 + 5 + this.displacement}px`,
      rightStart: 'auto',
      rightCenter: 'auto',
      rightEnd: `${this.targetBounding!.height / 2 + 5 + this.displacement}px`,
    };
    return position[this.popUpPosition];
  }

  /**
   * Calcula la posición `left` del triángulo del pop-up según la posición seleccionada.
   */
  private calculateTriangleLeftPosition(): string {
    const position: Record<PopUpPositionKey, string> = {
      topStart: `${this.targetBounding!.width / 2 + 4 + this.displacement}px`,
      topCenter: `${this.popUpBounding!.width / 2 - 7}px`,
      topEnd: 'auto',
      bottomStart: `${this.targetBounding!.width / 2 + 4 + this.displacement}px`,
      bottomCenter: `${this.popUpBounding!.width / 2 - 6}px`,
      bottomEnd: 'auto',
      leftStart: 'auto',
      leftCenter: 'auto',
      leftEnd: 'auto',
      rightStart: '3px',
      rightCenter: '3px',
      rightEnd: '3px',
    };
    return position[this.popUpPosition];
  }

  /**
   * Calcula la posición `right` del triángulo del pop-up según la posición seleccionada.
   */
  private calculateTriangleRightPosition(): string {
    const position: Record<PopUpPositionKey, string> = {
      topStart: 'auto',
      topCenter: 'auto',
      topEnd: `${this.targetBounding!.width / 2 + 3 + this.displacement}px`,
      bottomStart: 'auto',
      bottomCenter: 'auto',
      bottomEnd: `${this.targetBounding!.width / 2 + 3 + this.displacement}px`,
      leftStart: '3px',
      leftCenter: '3px',
      leftEnd: '3px',
      rightStart: 'auto',
      rightCenter: 'auto',
      rightEnd: 'auto',
    };
    return position[this.popUpPosition];
  }

  private mappingPopUpPositionToCssClass(): PopUpPositionKebabCaseKey {
    const keys: Record<PopUpPositionKey, PopUpPositionKebabCaseKey> = {
      topStart: 'top-start',
      topCenter: 'top-center',
      topEnd: 'top-end',
      rightStart: 'right-start',
      rightCenter: 'right-center',
      rightEnd: 'right-end',
      bottomStart: 'bottom-start',
      bottomCenter: 'bottom-center',
      bottomEnd: 'bottom-end',
      leftStart: 'left-start',
      leftCenter: 'left-center',
      leftEnd: 'left-end',
    };

    return keys[this.popUpPosition];
  }
}
