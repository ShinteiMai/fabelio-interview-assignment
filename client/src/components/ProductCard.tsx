import React from "react";
import { Product } from "../features/productSlice";
import Color from "./Color";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="">
      <img />
      <div>
        <div className="flex justify-between items-center">
          <h1>{product.name}</h1>
          <div className="flex justify-between items-center">
            <Color />
            <Color />
            <Color />
            <Color />
          </div>
        </div>
        <div className="">
          <span>{product.material}</span> •{" "}
          <span>
            {" "}
            {product.width} x {product.height} x {product.depth}
          </span>
        </div>
        <h1>Rp {product.price}</h1>
      </div>
    </div>
  );
};
export default ProductCard;
