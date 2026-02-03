import "./application.css";

import { useAppDispatch, useAppSelector } from "./hooks";
import { Panel } from "./panel/panel";
import { ProductDetals } from "./products/product-details/product-details";
import { ProductTile } from "./products/product-tile/product-tile";
import type { Product } from "./products/products";
import {
  selectProducts,
  selectProductsLoaded,
} from "./products/products.selectors";
import { getProducts } from "./products/products.thunks";
import { find, isEmpty, map, size } from "lodash";
import { useEffect, useRef, useState } from "react";

export const App = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsLoaded = useAppSelector(selectProductsLoaded);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [offset, setOffset] = useState(size(products) || 0);

  const productsListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isEmpty(products) && productsLoaded === false) {
      dispatch(getProducts({ limit: 5, offset: 0 }));
    }
  }, [dispatch, productsLoaded, products]);

  const handleSelectProduct = (productId: number) => {
    const product = find(products, (p) => p.id === productId);
    setSelectedProduct(product || null);
  };

  const loadProducts = async () => {
    setOffset(offset + 5);
    await dispatch(getProducts({ limit: 5, offset: offset + 5 }));

    const list = productsListRef.current;
    if (list) {
      requestAnimationFrame(() => {
        list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
      });
    }
  };

  return (
    <div className="app-layout">
      <div className="products-list">
        <div className="products-list-items" ref={productsListRef}>
          {map(products, (product) => {
            return (
              <ProductTile
                key={product.id}
                product={product}
                onSelect={handleSelectProduct}
              />
            );
          })}
        </div>
        <div className="load-more">
          <button onClick={loadProducts}>Load more</button>
        </div>
      </div>
      <Panel
        opened={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && <ProductDetals product={selectedProduct} />}
      </Panel>
    </div>
  );
};
