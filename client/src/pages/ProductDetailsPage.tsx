import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import {
  fetchProductDetails,
  productDetailsSelector,
} from "../features/productDetailsSlice";
import { viewProduct } from "../features/productSlice";
interface MatchParams {
  id: string;
}
const ProductDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const productId = match.params.id;
  const { data } = useSelector(productDetailsSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(viewProduct({ productId }));
    }
    dispatch(fetchProductDetails({ id: productId }));
    //eslint-disable-next-line
  }, []);

  return (
    <Layout title={data?.name || "Product"}>
      <span
        onClick={() => history.push("/")}
        className="cursor-pointer hover:opacity-75 transition-all duration-150 ease-in-out text-lg"
      >
        Go Back
      </span>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-5 gap-y-10 mt-8">
        <div />
        <div>{data && <ProductCard product={data} />}</div>
        <div />
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
