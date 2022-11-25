import '@testing-library/jest-dom';
import {render} from '../utils/testUtils';
import Icon from '../../src/components/Icon';
import React from 'react';

describe('test/components/Icon.test.ts', () => {
  test('It should be a render icon', async () => {
    const {getByDataCy} = render(
      <Icon
        renderMain={({title}) => <i data-cy="icon">{title}</i>}
        renderContainer={({id}, element) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {element}
          </div>
        )}
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('icon')).toHaveTextContent('icon');
  });
});
