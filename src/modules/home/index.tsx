import './styles/home.scss';

import React, { useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryParam, StringParam } from 'use-query-params';

import { useProducts } from './data/HomeQueryHooks';
import { usePaginatedList } from './hooks/usePaginatedList';
import ProductItem from './components/product-item';
import Paginated from './components/paginated';
import Header from './components/header';
import Loading from './components/loading';

const Home = () => {
  const { ref, page, setPage, pageSize } = usePaginatedList();

  const [sort] = useQueryParam('sort', StringParam);

  const {
    data: products,
    isLoading,
    error,
    isPreviousData,
  } = useProducts({ page, size: pageSize, sort });

  const pageCount = useMemo(() => {
    return products ? Math.ceil(products.meta.pagination.total / pageSize) : 10;
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
        <AnimatePresence exitBeforeEnter>
          {products.product_variations.map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: (index * 0.3) / pageSize, duration: 0.2 }}
            >
              <ProductItem data={data} />
            </motion.div>
          ))}
        </AnimatePresence>

        {fillArray.map(id => (
          <div key={id} />
        ))}
      </div>
    );
  }, [isLoading, error, products?.product_variations, fillArray]);

  return (
    <div ref={ref} className="flex flex-col flex-1 h-full bg-gray-100">
      <Header sortData={products?.meta.sort} />

      <div className="flex flex-1 overflow-hidden relative">
        {renderList()}
        <Loading isLoading={isLoading || isPreviousData} />
      </div>

      <Paginated page={page} setPage={setPage} pageCount={pageCount} />
    </div>
  );
};

export default Home;
