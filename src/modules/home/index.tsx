import './styles/home.scss';

import React, { useState } from 'react';

import { useProducts } from './data/HomeQueryHooks';

const Home = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
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
      <div>
        {products.product_variations.map(({ id, title }, index) => (
          <div key={id}>
            {index + 1}. {title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div>{renderList()}</div>
      <div>
        <label>page:</label>
        <input
          className="border"
          type="number"
          value={page}
          onChange={e => setPage(e.target.valueAsNumber)}
        />
      </div>
      <button onClick={() => setPage(page => page + 1)}>next</button>
      <div>
        <label>page size:</label>
        <input
          className="border"
          type="number"
          value={pageSize}
          onChange={e => setPageSize(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};

export default Home;
