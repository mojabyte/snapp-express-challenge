import './styles/product-item.scss';

import React from 'react';
import { ProductItem as ProductItemType } from 'modules/home/types/HomeTypes';

type ProductItemProps = {
  data: ProductItemType;
};

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  return (
    <div className="product-item-container">
      <div className="image-wrapper">
        <img src={data.images[0].imageSrc} />
      </div>
      <p className="title">{data.title}</p>
      <p className="price">{data.price.toLocaleString('fa')} تومان</p>
    </div>
  );
};

export default ProductItem;
