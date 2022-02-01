import React from 'react';
import { ProductItem as ProductItemType } from 'modules/home/types/HomeTypes';

type ProductItemProps = {
  data: ProductItemType;
};

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full shadow-md rounded-lg items-center justify-between p-3 bg-white">
      <div className="flex flex-1 items-center justify-center p-5">
        <img src={data.images[0].imageSrc} />
      </div>
      <div className="p-1 text-center text-xs h-10">{data.title}</div>
    </div>
  );
};

export default ProductItem;
