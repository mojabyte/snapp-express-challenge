import './styles/home.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { useProducts } from './data/HomeQueryHooks';
import ProductItem from './components/product-item';
import { usePaginatedList } from './hooks/usePaginatedList';
import { PulseLoader } from 'react-spinners';

const Home = () => {
  const { ref, page, setPage, pageSize } = usePaginatedList();

  const {
    data: products,
    isLoading,
    error,
    isPreviousData,
  } = useProducts({ page, size: pageSize });

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
    if (isLoading) {
      return null;
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
  }, [isLoading, error, products?.product_variations, fillArray]);

  const renderLoading = useCallback(() => {
    if (isLoading || isPreviousData) {
      return (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center backdrop-blur-sm">
          <PulseLoader color="var(--color-accent)" size={26} />
        </div>
      );
    }
    return null;
  }, [isLoading, isPreviousData]);

  return (
    <div ref={ref} className="flex flex-col flex-1 h-full bg-gray-100">
      <div className="flex flex-1 overflow-hidden relative">
        {renderList()}
        {renderLoading()}
      </div>

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
