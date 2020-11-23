import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import Layout from "../components/Layout";
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
      Product Details Page
      <h1>{product?.name}</h1>
      <p>Price: Rp.{product?.price}</p>
    </Layout>
  );
};

export default ProductDetailsPage;
