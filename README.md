# React Minimal Tooltip, a small and simple tooltip library.
![](example.gif)

Tooltips can be displayed on top or undeath the content they're describing, the tooltips will center themselves based on the location of their element and stretch and shrink in accordance to the page width. The tooltip can display any react node, not just strings.

But before you go any further: Do you even need a tooltip library? Maybe something like [the title attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) will suit your needs.


## Why use this over the other libraries?

Unlike the most popular React tooltip library which works via data tags, this library is in my opinion more 'reacty' and works via wrapping the element you wish to display a tooltip for with a component.

This package is also a bit smaller than other popular alternatives.

## Installation
```
npm install react-minimal-tooltip
```
```
yarn add react-minimal-tooltip
```

## Use

The simplest example:

``` javascript
import Tooltip from 'react-minimal-tooltip'

<Tooltip tooltipChildren="I am a tooltip">
  // the content the tooltip is for
  <button>Hover over me!</button>
</Tooltip>
```

## API

Below is the API for the default exported tooltip component. Note that this component wraps a div around the node the the tooltip is for, any prop given to the Tooltip component not mentioned below is passed through to that div:

Prop|Type|Required|Info|Default
-|-|-|-|-
hoverDurationUntilVisible|number|false|The amount of time in ms the cursor needs to be over the element until the tooltip appears|500
children|react node|true|the element the tooltip is for|N/A
tooltipChildren|react node|true|the content of the tooltip|N/A
tooltipPosition|string|false|the position of the tooltip, should be 'top' or 'bottom'|'top'
tooltipColor|string|false|valid css/style color, note that this is applied separately from `tooltipStyle` as the color is also applied to an svg element|'#d1d1d1'
tooltipStyle|object|false|style object that's applied to the visible part of the tooltip wrapper|{}
tooltipClassname|string|false|css classname that's applied to the visible part of the tooltip wrapper|''


## Advice

## Caveats

## Todo

