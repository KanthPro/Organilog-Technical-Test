import type { Product } from "../products";
import "./product-tile.css";

interface ProductTileProps {
  product: Product;
  onSelect: (productId: number) => void;
}

export const ProductTile = ({ product, onSelect }: ProductTileProps) => {
  return (
    <div className="product-tile" onClick={() => onSelect(product.id)}>
      <div className="pt-title">{product.title}</div>
      <div className="pt-desc">{product.description}</div>
    </div>
  );
};
