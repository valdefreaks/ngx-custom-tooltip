# ngx-custom-tooltip

> This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.13.

## About

**Simple and customizable tooltip/pop-up component for Angular projects.**  
It can be used as a tooltip (it closes when you click outside of it), or as a pop-up with a close button.  
It has a `ng-content` tag, so you can place all kinds of html elements inside them.

## Compatibility

| NgxCustomTooltip | Angular            | Node        |
|------------------|--------------------|-------------|
| 1.x.x            | => 9.0.0 <= 11.x.x | 16.20.2     |

## Get Started

**Step 1:** Install ngx-virtual-scroller

```sh
npm install ngx-custom-tooltip
```

**Step 2:** Import NgxCustomTooltipModule module into your **_app.module.ts_**

```ts
....
import { NgxCustomTooltipModule } from 'ngx-custom-tooltip';
....
@NgModule({
    ...
    imports: [
        ....
        NgxCustomTooltipModule
    ],
    ....
})
export class AppModule { }
```

**Step 3:** Wrap _ngx-custom-tooltip_ tag around your elements in your **_example.component.html_** file

```html
<button #target>Open</button>
<ngx-custom-tooltip [target]="target" (closeEmitter)="handleClose($event)">
  <p>This is a tooltip message!</p>
</ngx-custom-tooltip>
```

## Options

| Attribute           | Type          | Default value   | Description                                                                                                                               |
| ------------------- | ------------- | --------------- |-------------------------------------------------------------------------------------------------------------------------------------------|
| `bgColor`           | `string`      | `'#ffffff'`     | `background-color` property for the tooltip.                                                                                              |
| `borderColor`       | `string`      | `'#d3d3d3'`     | `border-color` property for the tooltip.                                                                                                  |
| `borderRadius`      | `string`      | `'4px'`         | `border-radious` property for the tooltip. Accepts css syntax.                                                                            |
| `closeButton`       | `boolean`     | `false`         | Indicates if the tooltip has a close button. If false, it closes when you click outside of it.                                            |
| `closeButtonImage`  | `string`      | `undefined`     | Image path for close button.                                                                                                              |
| `closeButtonMargin` | `string`      | `'20px'`        | Separation of the close button from the border. By default it is placed in the upper right corner. Accepts css syntax.                    |
| `closeButtonSize`   | `string`      | `'20px'`        | `height` and `widht` properties for the close button. Accepts css syntax.                                                                 |
| `displacement`      | `number`      | `0`             | Arbitrary offset of the tooltip from its target. It is ignored if a `center` type position is chosen.                                     |
| `floatingSize`      | `number`      | `3`             | Move the tooltip away from its target.                                                                                                    |
| `maxHeight`         | `string`      | `'max-content'` | Maximum height, after that, a vertical scroll appears. Accepts css syntax.                                                                |
| `maxWidth`          | `string`      | `'max-content'` | Maximum width, after that, a horizontal scroll appears. Accepts css syntax.                                                               |
| `minHeight`         | `string`      | `'auto'`        | Minimun height for the tooltip. Accepts css syntax.                                                                                       |
| `minWidth`          | `string`      | `'auto'`        | Minimun width for the tooltip. Accepts css syntax.                                                                                        |
| `padding`           | `string`      | `'8px'`         | `padding` property for the tooltip. Accepts css syntax.                                                                                   |
| `popUpPosition`     | `PopUpPositionKey`      | `'topCenter'`   | The position of the tooltip.                                                                           |
| `target`            | `HTMLElement` | `undefined`     | The HTMLEelement that activates the tooltip. If `closeButton` is `false` the `target` is excluded for the clickout event that close the button. |
| `triangleBgColor`   | `string`      | `undefined`     | `background-color` property for the triangle. If not provided, `bgColor` is used.                                                         |
| `(closeEmitter)`    | `boolean`     |                 | Emit `false` when tooltip is closed.                                                                                                      |
