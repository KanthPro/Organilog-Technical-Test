import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import type { AppState } from "./store";
import { find, isEmpty, map, size } from "lodash";
import { useEffect, useState } from "react";
import { getProducts } from "./products.thunks";
import type { Product } from "./products";

export const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: AppState) => state.products);
  console.log("products", products);

  const [opened, setOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [offset, setOffset] = useState(size(products.products) || 0);

  useEffect(() => {
    if (isEmpty(products.products) && products.loaded === false) {
      dispatch(getProducts({ limit: 5, offset: 0 }));
    }
  }, [dispatch, offset, products.loaded, products.products]);

  const handleSelectProduct = (productId: number) => {
    const product = find(products.products, (p) => p.id === productId);
    setOpened(true);
    setSelectedProduct(product || null);
  };

  const loadProducts = () => {
    setOffset(offset + 5);
    dispatch(getProducts({ limit: 5, offset: offset + 5 }));
  };

  return (
    <div className="app-layout">
      <div className="products-list">
        {map(products.products, (product) => {
          return (
            <div
              className="pl-item"
              key={product.id}
              onClick={() => handleSelectProduct(product.id)}
            >
              <div className="pl-item-title">{product.title}</div>
              <div className="pl-item-desc">${product.description}</div>
            </div>
          );
        })}
        <div className="load-more">
          <button onClick={loadProducts}>Load more</button>
        </div>
      </div>
      <div className={`panel ${opened ? "opened" : "closed"}`}>
        <div className="panel-close" onClick={() => setOpened(false)}>
          x
        </div>
        <div className="panel-content">
          <div>
            <img
              src={selectedProduct?.thumbnail}
              style={{ maxWidth: "100%" }}
            ></img>
            <div>Title: {selectedProduct?.title}</div>
          </div>
          <br />
          <div>Description : {selectedProduct?.description}</div>
          <br />
          <div>Price : {selectedProduct?.price}</div>
          <br />
          <div>Rating : {selectedProduct?.rating}</div>
          <br />
          <div>Stock : {selectedProduct?.stock}</div>
          <br />
          <div>Brand : {selectedProduct?.brand}</div>
          <br />
          <div>
            Gallery :
            <div className="gallery">
              {selectedProduct?.images.map((img, index) => (
                <img key={index} src={img} style={{ maxWidth: "50px" }}></img>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
