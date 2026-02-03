import "./product-details.css";

import type { Product } from "../products";
import { Gallery } from "../../gallery/gallery";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetals = ({ product }: ProductDetailsProps) => {
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
    </div>
  );
};
