import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { fetchProducts, productsSelector } from "../features/productSlice";
import { SliceStatus } from "../globals";

const ProductsPage = () => {
  const dispatch = useDispatch();
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
        <div className="py-12">
          {status.state === SliceStatus.LOADING ? (
            <div className="mx-auto text-center">
              <ScaleLoader />
            </div>
          ) : (
            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-5 gap-y-10">
              {data &&
                data.map((product) => (
                  <div key={product.id} className="cursor-pointer">
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
