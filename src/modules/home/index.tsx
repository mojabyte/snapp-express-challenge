import './styles/home.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { useProducts } from './data/HomeQueryHooks';
import ProductItem from './components/product-item';
import { usePaginatedList } from './hooks/usePaginatedList';

const Home = () => {
  const { ref, page, setPage, pageSize } = usePaginatedList();

  const { data: products, isLoading, error, isFetching } = useProducts({ page, size: pageSize });

  const pageCount = useMemo(() => {
    return products ? Math.floor(products.meta.pagination.total / pageSize) + 1 : 10;
  }, [pageSize, products?.meta.pagination.total]);

  useEffect(() => {
    if (products && products.meta.pagination.total < (page + 1) * pageSize) {
      setPage(pageCount - 1);
    }
  }, [pageSize, pageCount]);

  const fillArray = useMemo(() => {
    const fillSize = pageSize - products?.product_variations.length;
    return [...new Array(fillSize > 0 ? fillSize : 0)].map(() => Math.random());
  }, [pageSize, products?.product_variations.length]);

  const renderList = useCallback(() => {
    if (isLoading || isFetching) {
      return <div>loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="grid-list">
        {products.product_variations.map(data => (
          <div key={data.id}>
            <ProductItem data={data} />
          </div>
        ))}

        {fillArray.map(id => (
          <div key={id} />
        ))}
      </div>
    );
  }, [isLoading, isFetching, error, products?.product_variations, fillArray]);

  return (
    <div ref={ref} className="flex flex-col flex-1 h-full bg-gray-100">
      <div className="flex flex-1">{renderList()}</div>

      <div dir="ltr">
        <ReactPaginate
          className="pagination"
          nextLabel={<BiChevronRight />}
          previousLabel={<BiChevronLeft />}
          initialPage={page}
          forcePage={page}
          onPageChange={page => {
            setPage(page.selected);
          }}
          pageCount={pageCount}
          pageLabelBuilder={page => page.toLocaleString('fa')}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Home;
