import React from 'react';
import { ProductItem as ProductItemType } from 'modules/home/types/HomeTypes';

type ProductItemProps = {
  data: ProductItemType;
};

const ProductItem: React.FC<ProductItemProps> = ({ data }) => {
  return (
    <div className="flex flex-1 flex-col shadow-md rounded-lg items-center justify-between p-3 bg-white">
      <div className="w-full">
        <img src={data.images[0].imageSrc} />
      </div>
      <div className="p-1 text-center text-xs">{data.title}</div>
    </div>
  );
};

export default ProductItem;
