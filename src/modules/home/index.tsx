import './styles/home.scss';

import React from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { useProducts } from './data/HomeQueryHooks';
import ProductItem from './components/product-item';

const Home = () => {
  const [page, setPage] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSize] = useQueryParam('size', NumberParam);
  const { data: products, isLoading, error } = useProducts({ page, size: pageSize });
  console.log(products);

  const renderList = () => {
    if (isLoading) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="flex-1 grid grid-cols-6 gap-3 m-3">
        {products.product_variations.map(data => (
          <div className="flex" key={data.id}>
            <ProductItem data={data} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-100">
      <div>
        <label>page size:</label>
        <input
          className="border"
          type="number"
          value={pageSize}
          onChange={e => setPageSize(e.target.valueAsNumber)}
        />
      </div>

      <div className="flex flex-1">{renderList()}</div>

      <div dir="ltr">
        <ReactPaginate
          className="pagination"
          nextLabel={<BiChevronRight />}
          previousLabel={<BiChevronLeft />}
          initialPage={page}
          onPageChange={page => {
            setPage(page.selected);
          }}
          pageCount={products ? products.meta.pagination.total / pageSize : 10}
          pageLabelBuilder={page => page.toLocaleString('fa')}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Home;
