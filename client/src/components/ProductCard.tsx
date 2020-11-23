import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Product } from "../features/productSlice";
import { formatter } from "../utils/formatter";
import Color from "./Color";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const history = useHistory();
  const [activeColor, setActiveColor] = useState<number>(
    product.productImages.length - 1
  );
  return (
    <>
      <div>
        <img
          src={product.productImages[activeColor].imageUrl}
          className="object-contain w-full h-56 hover:opacity-50 transition-all ease-in-out duration-150"
          onClick={() => history.push(`/products/${product.id}`)}
          alt={product.name}
        />
      </div>
      <div className="px-2">
        <div className="flex justify-between items-center">
          <div className="mt-4">
            <div>
              <h1 className="font-bold uppercase leading-tight">
                {product.name}
              </h1>
            </div>
            <div>
              <span className="text-sm mr-1">{product.material}</span> •{" "}
              <span className="text-sm ml-1">
                {" "}
                {product.width} x {product.height} x {product.depth}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            {product.productImages.map(({ color }, index) => (
              <div className="mr-1">
                <Color
                  onClick={() => setActiveColor(index)}
                  isActive={index === activeColor}
                  key={`${product.id}-${color.id}`}
                  color={color.hex}
                />
              </div>
            ))}
          </div>
        </div>
        <h1 className="mt-2 text-2xl font-semibold">
          {formatter.format(product.price)}
        </h1>
      </div>
    </>
  );
};
export default ProductCard;
