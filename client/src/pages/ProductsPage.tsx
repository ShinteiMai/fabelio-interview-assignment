import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { fetchProducts, productsSelector } from "../features/productSlice";
import { SliceStatus } from "../globals";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, status } = useSelector(productsSelector);
  useEffect(() => {
    dispatch(fetchProducts({}));
    //eslint-disable-next-line
  }, []);
  return (
    <Layout title="Products">
      <div>
        <h1 className="text-5xl font-semibold">Furnitures</h1>
        <p className="text-sm">
          Decorate and make your house more lively with our furnitures that have
          the best quality that you can find in the market.
        </p>

        <div>
          {status.state === SliceStatus.LOADING ? (
            <div>
              <ScaleLoader />
            </div>
          ) : (
            <div className="grid grid-">
              {data &&
                data.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => history.push(`/products/${product.id}`)}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
