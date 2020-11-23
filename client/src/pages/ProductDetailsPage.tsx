import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Layout from "../components/Layout";
import { productsSelector } from "../features/productSlice";
interface MatchParams {
  id: string;
}
const ProductDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const productId = match.params.id;
  const { data } = useSelector(productsSelector);
  const product = data?.filter((p) => p.id !== productId)[0];

  return (
    <Layout title={product?.name || "Product"}>
      Product Details Page
      <h1>{product?.name}</h1>
      <p>Price: Rp.{product?.price}</p>
    </Layout>
  );
};

export default ProductDetailsPage;
