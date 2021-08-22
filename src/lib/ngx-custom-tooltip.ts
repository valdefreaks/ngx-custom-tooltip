import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import * as _ from "lodash";
import { CommonModule } from "@angular/common";
@Component({
  selector: "ngx-custom-tooltip",
  template: `
    <div
      class="ngxct-component"
      #popUp
      [style.top]="popUpTopProperty"
      [style.left]="popUpLeftProperty"
    >
      <div
        class="ngxct-fixed"
        [style.border-radius]="borderRadius"
        [style.max-height]="maxHeight"
        [style.max-width]="maxWidth"
        [style.min-height]="minHeight"
        [style.min-width]="minWidth"
        (click)="handleStopEvents($event)"
      >
        <div
          class="ngxct-container"
          [style.background-color]="bgColor"
          [style.border-color]="borderColor"
          [style.border-radius]="borderRadius"
          [style.padding]="padding"
        >
          <img
            class="ngxct-close-button"
            alt=""
            *ngIf="closeButton"
            [src]="closeButtonImage && closeButtonImage"
            [style.height]="closeButtonSize"
            [style.right]="closeButtonMargin"
            [style.top]="closeButtonMargin"
            [style.width]="closeButtonSize"
            (click)="closePopUp()"
          />
          <ng-content class="ngxct-content"></ng-content>
        </div>
        <div
          class="ngxct-triangle"
          [ngClass]="popUpPosition"
          [style.background-color]="triangleBgColor ? triangleBgColor : bgColor"
          [style.border-bottom-color]="borderColor"
          [style.border-right-color]="borderColor"
          [style.bottom]="triangleBottomPosition"
          [style.left]="triangleLeftPosition"
          [style.right]="triangleRightPosition"
          [style.top]="triangleTopPosition"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
      }
      :host {
        background-color: transparent;
        left: 0;
        position: fixed;
        top: 0;
        z-index: 10;
      }
      :host > .ngxct-component {
        position: fixed;
        transition: all 0.3s ease-in-out;
      }
      :host > .ngxct-component > .ngxct-fixed {
        background-color: transparent;
        box-sizing: content-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        padding: 10px;
        position: relative;
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-container {
        border-style: solid;
        border-width: 1px;
        box-shadow: 0 0 10px -1px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
        position: relative;
        width: 100%;
        z-index: 2;
      }
      :host
        > .ngxct-component
        > .ngxct-fixed
        > .ngxct-container
        > .ngxct-close-button {
        cursor: pointer;
        position: absolute;
      }
      :host
        > .ngxct-component
        > .ngxct-fixed
        > .ngxct-container
        > .ngxct-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        border-right-style: solid;
        border-right-width: 1px;
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: 3;
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.topCenter,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.topStart,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.topEnd {
        transform: rotate(45deg);
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.bottomCenter,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.bottomStart,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.bottomEnd {
        transform: rotate(225deg);
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.rightCenter,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.rightStart,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.rightEnd {
        transform: rotate(135deg);
      }
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.leftCenter,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.leftStart,
      :host > .ngxct-component > .ngxct-fixed > .ngxct-triangle.leftEnd {
        transform: rotate(315deg);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxCustomTooltipComponent
  implements OnInit, DoCheck, AfterContentChecked
{
  @Input() bgColor: string = "#ffffff";
  @Input() borderColor: string = "#d3d3d3";
  @Input() borderRadius: string = "4px";
  @Input() closeButton = false;
  @Input() closeButtonImage?: string;
  @Input() closeButtonMargin: string = "20px";
  @Input() closeButtonSize: string = "20px";
  @Input() displacement = 0;
  @Input() floatingSize = 3;
  @Input() maxHeight: string = "max-content";
  @Input() maxWidth: string = "max-content";
  @Input() minHeight: string = "auto";
  @Input() minWidth: string = "auto";
  @Input() padding: string = "8px";
  @Input() popUpPosition: string = "topCenter";
  @Input() target?: HTMLElement;
  @Input() triangleBgColor: string;
  @Output() closeEmitter: EventEmitter<boolean> = new EventEmitter();
  @ViewChild("popUp") popUpElement?: ElementRef;
  private popUpBounding?: DOMRect;
  private targetBounding?: DOMRect;
  popUpTopProperty?: string;
  popUpLeftProperty?: string;
  triangleTopPosition?: string;
  triangleLeftPosition?: string;
  triangleBottomPosition?: string;
  triangleRightPosition?: string;
  private validPositions = [
    "topStart",
    "topCenter",
    "topEnd",
    "bottomStart",
    "bottomCenter",
    "bottomEnd",
    "leftStart",
    "leftCenter",
    "leftEnd",
    "rightStart",
    "rightCenter",
    "rightEnd",
  ];
  private setPopUpTopPosition: any = {
    topStart: () =>
      `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
    topCenter: () =>
      `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
    topEnd: () =>
      `${
        this.targetBounding!.top -
        this.popUpBounding!.height -
        this.floatingSize
      }px`,
    rightStart: () => `${this.targetBounding!.top - 11 - this.displacement}px`,
    rightCenter: () =>
      `${
        this.targetBounding!.top +
        this.targetBounding!.height / 2 -
        this.popUpBounding!.height / 2
      }px`,
    rightEnd: () =>
      `${
        this.targetBounding!.bottom -
        this.popUpBounding!.height +
        10 +
        this.displacement
      }px`,
    bottomStart: () => `${this.targetBounding!.bottom + this.floatingSize}px`,
    bottomCenter: () => `${this.targetBounding!.bottom + this.floatingSize}px`,
    bottomEnd: () => `${this.targetBounding!.bottom + this.floatingSize}px`,
    leftStart: () => `${this.targetBounding!.top - 11 - this.displacement}px`,
    leftCenter: () =>
      `${
        this.targetBounding!.top +
        this.targetBounding!.height / 2 -
        this.popUpBounding!.height / 2
      }px`,
    leftEnd: () =>
      `${
        this.targetBounding!.bottom -
        this.popUpBounding!.height +
        10 +
        this.displacement
      }px`,
  };
  private setPopUpLeftPosition: any = {
    topStart: () => `${this.targetBounding!.left - 10 - this.displacement}px`,
    topCenter: () =>
      `${
        this.targetBounding!.left +
        this.targetBounding!.width / 2 -
        this.popUpBounding!.width / 2
      }px`,
    topEnd: () =>
      `${
        this.targetBounding!.right -
        this.popUpBounding!.width +
        10 +
        this.displacement
      }px`,
    rightStart: () => `${this.targetBounding!.right + this.floatingSize}px`,
    rightCenter: () => `${this.targetBounding!.right + this.floatingSize}px`,
    rightEnd: () => `${this.targetBounding!.right + this.floatingSize}px`,
    bottomStart: () =>
      `${this.targetBounding!.left - 10 - this.displacement}px`,
    bottomCenter: () =>
      `${
        this.targetBounding!.left +
        this.targetBounding!.width / 2 -
        this.popUpBounding!.width / 2
      }px`,
    bottomEnd: () =>
      `${
        this.targetBounding!.right -
        this.popUpBounding!.width +
        11 +
        this.displacement
      }px`,
    leftStart: () =>
      `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
    leftCenter: () =>
      `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
    leftEnd: () =>
      `${
        this.targetBounding!.left -
        this.popUpBounding!.width -
        this.floatingSize
      }px`,
  };
  private setTriangleTopPosition: any = {
    topStart: () => "auto",
    topCenter: () => "auto",
    topEnd: () => "auto",
    bottomStart: () => "3px",
    bottomCenter: () => "3px",
    bottomEnd: () => "3px",
    leftStart: () =>
      `${this.targetBounding!.height / 2 + 3 + this.displacement}px`,
    leftCenter: () => `${this.popUpBounding!.height / 2 - 8}px`,
    leftEnd: () => "auto",
    rightStart: () =>
      `${this.targetBounding!.height / 2 + 3 + this.displacement}px`,
    rightCenter: () => `${this.popUpBounding!.height / 2 - 5}px`,
    rightEnd: () => "auto",
  };
  private setTriangleBottomPosition: any = {
    topStart: () => "3px",
    topCenter: () => "3px",
    topEnd: () => "3px",
    bottomStart: () => "auto",
    bottomCenter: () => "auto",
    bottomEnd: () => "auto",
    leftStart: () => "auto",
    leftCenter: () => "auto",
    leftEnd: () =>
      `${this.targetBounding!.height / 2 + 5 + this.displacement}px`,
    rightStart: () => "auto",
    rightCenter: () => "auto",
    rightEnd: () =>
      `${this.targetBounding!.height / 2 + 5 + this.displacement}px`,
  };
  private setTriangleLeftPosition: any = {
    topStart: () =>
      `${this.targetBounding!.width / 2 + 4 + this.displacement}px`,
    topCenter: () => `${this.popUpBounding!.width / 2 - 7}px`,
    topEnd: () => "auto",
    bottomStart: () =>
      `${this.targetBounding!.width / 2 + 4 + this.displacement}px`,
    bottomCenter: () => `${this.popUpBounding!.width / 2 - 6}px`,
    bottomEnd: () => "auto",
    leftStart: () => "auto",
    leftCenter: () => "auto",
    leftEnd: () => "auto",
    rightStart: () => "3px",
    rightCenter: () => "3px",
    rightEnd: () => "3px",
  };
  private setTriangleRightPosition: any = {
    topStart: () => "auto",
    topCenter: () => "auto",
    topEnd: () => `${this.targetBounding!.width / 2 + 3 + this.displacement}px`,
    bottomStart: () => "auto",
    bottomCenter: () => "auto",
    bottomEnd: () =>
      `${this.targetBounding!.width / 2 + 3 + this.displacement}px`,
    leftStart: () => "3px",
    leftCenter: () => "3px",
    leftEnd: () => "3px",
    rightStart: () => "auto",
    rightCenter: () => "auto",
    rightEnd: () => "auto",
  };
  constructor(private cdr: ChangeDetectorRef) {}
  @HostListener("document:click", ["$event"])
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
  ngOnInit(): void {}
  ngDoCheck(): void {
    if (this.target) {
      if (this.popUpElement) {
        this.checkForPositionChanges();
      }
    } else {
      console.warn('No "target" was provided!.');
      this.closeEmitter.emit(false);
    }
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
  closePopUp(): void {
    this.closeEmitter.emit(false);
  }
  checkForPositionChanges(): void {
    const index = this.validPositions.findIndex(
      (o: string) => o === this.popUpPosition
    );
    this.popUpPosition = index !== -1 ? this.popUpPosition : "topCenter";
    this.displacement = !isNaN(+this.displacement)
      ? Number(this.displacement)
      : 0;
    if (!this.targetBounding!) {
      this.setPositions();
    } else {
      const last = () => {
        const { top, right, bottom, left, width, height, x, y } =
          this.targetBounding!;
        return { top, right, bottom, left, width, height, x, y };
      };
      const news = (): {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
      } => {
        const { top, right, bottom, left, width, height, x, y } =
          this.target!.getBoundingClientRect();
        return { top, right, bottom, left, width, height, x, y };
      };

      if (!_.isEqual(last(), news())) {
        this.setPositions();
      }
    }
  }
  setPositions(): void {
    this.targetBounding! = this.target!.getBoundingClientRect();
    this.popUpBounding! =
      this.popUpElement!.nativeElement.getBoundingClientRect();
    this.popUpTopProperty = this.setPopUpTopPosition[this.popUpPosition]();
    this.popUpLeftProperty = this.setPopUpLeftPosition[this.popUpPosition]();
    this.triangleTopPosition =
      this.setTriangleTopPosition[this.popUpPosition]();
    this.triangleBottomPosition =
      this.setTriangleBottomPosition[this.popUpPosition]();
    this.triangleLeftPosition =
      this.setTriangleLeftPosition[this.popUpPosition]();
    this.triangleRightPosition =
      this.setTriangleRightPosition[this.popUpPosition]();
  }
  handleStopEvents(event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
@NgModule({
  declarations: [NgxCustomTooltipComponent],
  imports: [CommonModule],
  exports: [NgxCustomTooltipComponent],
})
export class NgxCustomTooltipModule {}
