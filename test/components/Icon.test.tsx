import '@testing-library/jest-dom';
import React from 'react';
import Icon from '../../src/components/Icon';
import { render } from '../utils/test_utils';

describe('test/components/Icon.test.ts', () => {
  test('It should be a render icon', async () => {
    const { getByDataCy } = render(
      <Icon
        renderMain={() => <i data-cy="icon">{'icon'}</i>}
        renderContainer={({ id, children }) => (
          <div data-cy="container" data-id={id} tabIndex={1}>
            {children}
          </div>
        )}
      />,
    );

    expect(getByDataCy('container')).toHaveAttribute('tabIndex');
    expect(getByDataCy('icon')).toHaveTextContent('icon');
  });
});
