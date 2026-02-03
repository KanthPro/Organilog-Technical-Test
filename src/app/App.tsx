import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Panel } from "./panel/panel";
import { ProductTile } from "./products/product-tile/product-tile";
import type { Product } from "./products/products";
import {
  selectProducts,
  selectProductsLoaded,
} from "./products/products.selectors";
import { getProducts } from "./products/products.thunks";
import { find, isEmpty, map, size } from "lodash";
import { useEffect, useState } from "react";

export const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsLoaded = useAppSelector(selectProductsLoaded);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [offset, setOffset] = useState(size(products) || 0);

  useEffect(() => {
    if (isEmpty(products) && productsLoaded === false) {
      dispatch(getProducts({ limit: 5, offset: 0 }));
    }
  }, [dispatch, productsLoaded, products]);

  const handleSelectProduct = (productId: number) => {
    const product = find(products, (p) => p.id === productId);
    setSelectedProduct(product || null);
  };

  const loadProducts = () => {
    setOffset(offset + 5);
    dispatch(getProducts({ limit: 5, offset: offset + 5 }));
  };

  return (
    <div className="app-layout">
      <div className="products-list">
        {map(products, (product) => {
          return (
            <ProductTile
              key={product.id}
              product={product}
              onSelect={handleSelectProduct}
            />
          );
        })}
        <div className="load-more">
          <button onClick={loadProducts}>Load more</button>
        </div>
      </div>
      <Panel
        opened={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        <div>
          <img
            src={selectedProduct?.thumbnail}
            style={{ maxWidth: "100%" }}
          ></img>
          <div>
            <u>Title :</u> {selectedProduct?.title}
          </div>
        </div>
        <br />
        <div>
          <u>Description :</u> {selectedProduct?.description}
        </div>
        <br />
        <div>
          <u>Price :</u> {selectedProduct?.price}
        </div>
        <br />
        <div>
          <u>Rating :</u> {selectedProduct?.rating}
        </div>
        <br />
        <div>
          <u>Stock :</u> {selectedProduct?.stock}
        </div>
        <br />
        <div>
          <u>Brand :</u> {selectedProduct?.brand}
        </div>
        <br />
        <div>
          <u>Gallery :</u>
          <div className="gallery">
            {map(selectedProduct?.images, (img, index) => (
              <img key={index} src={img} style={{ maxWidth: "50px" }} />
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
};
