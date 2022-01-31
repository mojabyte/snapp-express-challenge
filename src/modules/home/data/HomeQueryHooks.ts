import { useQuery } from 'react-query';

import { PageParam } from '../types/HomeTypes';
import { getProducts } from './HomeServices';

export const useProducts = ({ page, size }: PageParam) =>
  useQuery(['products', page, size], () => getProducts({ page, size }), { keepPreviousData: true });
