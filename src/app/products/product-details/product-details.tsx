import "./product-details.css";

import type { Product } from "../products";
import { Gallery } from "../../gallery/gallery";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProductsByCategory } from "../products.thunks";
import { isEmpty, map } from "lodash";
import { selectProductsByCategory } from "../products.selectors";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetals = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();

  const categoryProducts = useAppSelector(
    selectProductsByCategory(product.category),
  );

  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (isEmpty(categoryProducts)) {
      dispatch(getProductsByCategory({ category: product.category }));
    }
  });

  const handleShowCategoryProducts = async () => {
    setShowList(!showList);
  };

  return (
    <div className="product-details">
      <img className="pd-thumbmail" src={product.thumbnail}></img>
      <div className="pd-title">
        <u>Title :</u> {product.title}
      </div>
      <br />
      <div className="pd-desc">
        <u>Description :</u> {product.description}
      </div>
      <br />
      <div className="pd-title">
        <u>Price :</u> {product.price}
      </div>
      <br />
      <div className="pd-rating">
        <u>Rating :</u> {product.rating}
      </div>
      <br />
      <div className="pd-stock">
        <u>Stock :</u> {product.stock}
      </div>
      <br />
      <div className="pd-brand">
        <u>Brand :</u> {product.brand}
      </div>
      <br />
      <div className="pd-gallery">
        <u>Gallery :</u>
        <Gallery images={product.images} />
      </div>
      <div className="pd-category">
        <button
          className="pd-category-button"
          onClick={handleShowCategoryProducts}
        >
          Show {product.category} Products
        </button>
        {showList && (
          <div className="pd-category-items">
            {map(categoryProducts, (prod) => {
              return <div key={prod.id}>{prod.title}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
