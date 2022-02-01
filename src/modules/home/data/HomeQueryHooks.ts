import { useQuery } from 'react-query';

import { PageParam } from '../types/HomeTypes';
import { getProducts } from './HomeServices';

export const useProducts = ({ page, size, sort }: PageParam) =>
  useQuery(['products', sort, page, size], () => getProducts({ page, size, sort }), {
    keepPreviousData: true,
  });
