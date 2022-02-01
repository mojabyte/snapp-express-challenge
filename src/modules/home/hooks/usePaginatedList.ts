import { useCallback } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import { useResizeDetector } from 'react-resize-detector';

import { WIDTH_BREAKPOINTS, HEIGHT_BREAKPOINTS, COLUMN_COUNTS, ROW_COUNTS } from '../constants';

export function usePaginatedList() {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSize] = useQueryParam('size', NumberParam);

  const onResize = useCallback((width: number, height: number) => {
    let width_breakpoint = 'xs';
    let height_breakpoint = 'xs';

    for (let [key, value] of Object.entries(WIDTH_BREAKPOINTS)) {
      if (width > value) {
        width_breakpoint = key;
      } else {
        break;
      }
    }

    for (let [key, value] of Object.entries(HEIGHT_BREAKPOINTS)) {
      if (height > value) {
        height_breakpoint = key;
      } else {
        break;
      }
    }

    const col_counts = COLUMN_COUNTS[width_breakpoint] || 2;
    const row_counts = ROW_COUNTS[height_breakpoint] || 1;

    setPageSize(col_counts * row_counts);
  }, []);

  const { ref } = useResizeDetector({ onResize });

  return { ref, page, setPage, pageSize, setPageSize };
}
