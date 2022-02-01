export type ProductImage = {
  imageSrc: string;
  imageThumbnailSrc: string;
  imageUserType: string;
  isDefault: boolean;
};

export type ProductItem = {
  active: boolean;
  barcode: string;
  brandDescription: string;
  brandId: number;
  brandLogo: string;
  brandTitle: string;
  capacity: number;
  containerPrice: number;
  description: string;
  disabledUntil: boolean;
  discount: number;
  discountRatio: number;
  featured: string;
  highlight: string;
  id: number;
  images: ProductImage[];
  popularityBadgeName: string;
  popularityBadgeURL: string;
  price: number;
  productId: string;
  productTitle: string;
  productToppings: [];
  productVariationTitle: string;
  rating: number;
  score: number;
  title: string;
  type: string;
  vat: number;
  vendorLogo: string;
};

export type CategoryItem = {
  id: number;
  image: string;
  lft: number;
  rgt: number;
  title: string;
};

export type FilterItem = {
  enabled: boolean;
  icon: string;
  name: string;
  translation: string;
};

export type FilterResultItem = {
  filters: FilterItem[];
  icon: string;
  multiple_choice: boolean;
  name: string;
  translation: string;
  type: 'Text';
};

export type SortResultItem = {
  enabled: boolean;
  icon: string;
  name: string;
  order: string;
  translation: string;
};

export type ResponseMeta = {
  categoryTitle: string;
  filter: { results: FilterResultItem[]; default_title: string };
  pagination: { size: number; page: number; total: number };
  sort: { results: SortResultItem[]; default_title: string };
};

export type ProductsResponse = {
  categories: CategoryItem[];
  product_variations: ProductItem[];
  meta: ResponseMeta;
};

export type Response<T> = {
  code: number;
  status: boolean;
  data: T;
};

export type PageParam = {
  page: number;
  size: number;
  sort: string;
};
