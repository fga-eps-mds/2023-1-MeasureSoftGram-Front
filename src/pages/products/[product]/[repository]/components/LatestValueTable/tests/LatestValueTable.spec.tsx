import React from 'react';
import { render } from '@testing-library/react';
import LatestValueTable from '../LatestValueTable';

describe('LatestValueTable', () => {
  it('renders with latestValue', () => {
    const title = 'Título da tabela';
    const latestValue = {
      results: [
        {
          name: 'item 1',
          latest: {
            value: 123,
            created_at: '2022-12-01T09:12:00.000Z'
          }
        },
        {
          name: 'item 2',
          latest: {
            value: 456,
            created_at: '2022-12-02T09:12:00.000Z'
          }
        }
      ]
    };
    const { container } = render(<LatestValueTable title={title} latestValue={latestValue} />);
    expect(container).toMatchSnapshot();
  });
});
