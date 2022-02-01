import axios from 'axios';
import { PageParam, ProductsResponse, Response } from '../types/HomeTypes';

export async function getProducts(pageParam: PageParam) {
  const response = await axios.get<Response<ProductsResponse>>(
    '/mobile/v2/product-variation/index?filters=%7B%7D&fetch_filters=1&fetch_categories=1&menu_category_id=390176&vendorCode=po9qzk&page=0&client=PWA&optionalClient=PWA&deviceType=PWA&appVersion=5.6.6&optionalVersion=5.6.6&UDID=ca69b564-a46e-4b71-a59b-6e08975ac8d3',
    {
      params: {
        page: pageParam.page || 0,
        size: pageParam.size || 12,
        sort: pageParam.sort,
      },
    }
  );
  return response.data.data;
}
