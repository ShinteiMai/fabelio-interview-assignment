import React, { useEffect, useState } from "react";
import useScrollDirection from "../hooks/useScrollDirection";

const Navbar = () => {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [scrolledToTop, setScrolledToTop] = useState<boolean>(true);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        "fixed z-50 w-full bg-primary flex justify-between py-2 transition-all duration-300 transform" +
        " " +
        (scrollDirection === "up" && !scrolledToTop && "translate-y-0") +
        " " +
        (scrollDirection === "down" && !scrolledToTop && "-translate-y-16")
      }
    >
      <div className="ml-3">
        <p className="text-semibold text-white font-medium hidden md:block">
          Fabelio
        </p>
      </div>
      <div className="mr-4">
        <a className="text-white text-base mr-3 font-medium" href="/login">
          Login
        </a>
        <a className="text-white text-base font-medium" href="/register">
          Register
        </a>
      </div>
    </div>
  );
};
export default Navbar;
