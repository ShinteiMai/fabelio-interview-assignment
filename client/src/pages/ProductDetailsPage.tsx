import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { productsSelector, viewProduct } from "../features/productSlice";
interface MatchParams {
  id: string;
}
const ProductDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const productId = match.params.id;
  const { data } = useSelector(productsSelector);
  const product = data?.filter((p) => p.id !== productId)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(viewProduct({ productId }));
    }

    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={product?.name || "Product"}>
      {product && <ProductCard product={product} />}
    </Layout>
  );
};

export default ProductDetailsPage;
