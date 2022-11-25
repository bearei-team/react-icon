# react-icon

A basic icon component that supports react and native react.

## Installation

> yarn add @bearei/react-icon --save

## Parameters

| Name            |                     Type | Required | Description               |
| :-------------- | -----------------------: | -------: | :------------------------ |
| size            | 'small','medium','large' |        ✘ | Set the icon size         |
| width           |            string,number |        ✘ | Set the width of the icon |
| height          |            string,number |        ✘ | Set the icon height       |
| fill            |                   string |        ✘ | Set the icon fill color   |
| component       |          React.ReactNode |        ✘ | Custom icon component     |
| renderMain      |          function(props) |        ✘ | Render the icon main      |
| renderContainer |  function(props,element) |        ✘ | Render the icon container |

## Use

```typescript
import React from 'React';
import ReactDOM from 'react-dom';
import Icon from '@bearei/react-icon';

const icon = (
  <Icon
    renderMain={() => <i data-cy="icon">{'icon'}</i>}
    renderContainer={({id}, element) => (
      <div data-cy="container" data-id={id} tabIndex={1}>
        {element}
      </div>
    )}
  />
);

ReactDOM.render(icon, container);
```
