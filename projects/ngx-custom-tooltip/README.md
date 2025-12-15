# ngx-custom-tooltip

## About

**Simple and customizable tooltip/pop-up component for Angular projects.**  
It can be used as a tooltip (it closes when you click outside of it), or as a pop-up with a close button.  
It has a `ng-content` tag, so you can place all kinds of html elements inside them.

## Compatibility

| NgxCustomTooltip | Angular            |
| ---------------- | ------------------ |
| 0.x.x            | ^9.0.0             |
| 1.0.x            | => 9.0.0 <= 10.2.x |
| 1.1.x            | => 9.0.0 <= 11.0.0 |
| 1.2.x            | => 9.0.0 <= 12.0.0 |
| 1.3.x            | => 9.0.0 < 14.0.0  |
| 2.0.x            | ^14.0.0            |
| 2.1.x            | => 14.0.0 < 16.0.0 |
| 2.2.x            | => 14.0.0 < 17.0.0 |
| 2.3.x            | => 14.0.0 < 18.0.0 |
| 2.4.x            | => 14.0.0 < 19.0.0 |
| 2.5.x            | => 14.0.0 < 20.0.0 |
| 3.0.x            | => 17.0.0 < 21.0.0 |

## Get Started

**Step 1:** Install ngx-custom-tooltip

```sh
npm install ngx-custom-tooltip
```

**Step 2:** Import NgxCustomTooltipModule module into your **_app.module.ts_** or into a specific module where you want to use it.

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

If you have a standalone app instead, import the NgxCustomTooltipComponent into your **_example.component.ts_**.

```ts
....
import { NgxCustomTooltipComponent } from 'ngx-custom-tooltip';
....
@Component({
  ...
  standalone: true,
  imports: [
    ....
    NgxCustomTooltipComponent,
  ],
  ....
})
export class ExampleComponent { }
```

**Step 3:** Wrap _ngx-custom-tooltip_ tag around your elements in your **_example.component.html_** file

```html
<button #target>Open</button>
<ngx-custom-tooltip [target]="target" (closeEmitter)="handleClose($event)">
  <p>This is a tooltip message!</p>
</ngx-custom-tooltip>
```

## Options

| Attribute           | Type               | Default value   | Description                                                                                                                                     |
| ------------------- | ------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `bgColor`           | `string`           | `'#ffffff'`     | `background-color` property for the tooltip.                                                                                                    |
| `borderColor`       | `string`           | `'#d3d3d3'`     | `border-color` property for the tooltip.                                                                                                        |
| `borderRadius`      | `string`           | `'4px'`         | `border-radius` property for the tooltip. Accepts css syntax.                                                                                   |
| `closeButton`       | `boolean`          | `false`         | Indicates if the tooltip has a close button. If false, it closes when you click outside of it.                                                  |
| `closeButtonImage`  | `string`           | `undefined`     | Image path for close button.                                                                                                                    |
| `closeButtonMargin` | `string`           | `'20px'`        | Separation of the close button from the border. By default it is placed in the upper right corner. Accepts css syntax.                          |
| `closeButtonSize`   | `string`           | `'20px'`        | `height` and `width` properties for the close button. Accepts css syntax.                                                                       |
| `displacement`      | `number`           | `0`             | Arbitrary offset of the tooltip from its target. It is ignored if a `center` type position is chosen.                                           |
| `floatingSize`      | `number`           | `3`             | Move the tooltip away from its target.                                                                                                          |
| `maxHeight`         | `string`           | `'max-content'` | Maximum height, after that, a vertical scroll appears. Accepts css syntax.                                                                      |
| `maxWidth`          | `string`           | `'max-content'` | Maximum width, after that, a horizontal scroll appears. Accepts css syntax.                                                                     |
| `minHeight`         | `string`           | `'auto'`        | Minimum height for the tooltip. Accepts css syntax.                                                                                             |
| `minWidth`          | `string`           | `'auto'`        | Minimum width for the tooltip. Accepts css syntax.                                                                                              |
| `padding`           | `string`           | `'8px'`         | `padding` property for the tooltip. Accepts css syntax.                                                                                         |
| `popUpPosition`     | `PopUpPositionKey` | `'topCenter'`   | The position of the tooltip.                                                                                                                    |
| `target`            | `HTMLElement`      | `undefined`     | The HTMLElement that activates the tooltip. If `closeButton` is `false` the `target` is excluded for the clickout event that close the button. |
| `triangleBgColor`   | `string`           | `undefined`     | `background-color` property for the triangle. If not provided, `bgColor` is used.                                                               |
| `(closeEmitter)`    | `boolean`          |                 | Emit `false` when tooltip is closed.                                                                                                            |

## Report Issues

If you find any issues or have suggestions for improvement, please report them [here.](https://github.com/valdefreaks/ngx-custom-tooltip/issues)

When reporting an issue, include:

- Clear description of the problem
- Angular and library version you're using
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots or code examples if possible

## License

This project is under the MIT license. See the LICENSE file for more details.

## Author

**Valdemar Farina**

- GitHub: [@valdefreaks](https://github.com/valdefreaks)
