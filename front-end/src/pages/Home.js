import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Pagination } from "@mui/material";
import ResponsiveAppBar from "../components/NavBar";
import Product_card from "../components/product_card";
import axios from "axios";

const Home = () => {  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/List");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProductsData();
  }, []);  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Stack>
      <ResponsiveAppBar />
      <Box id="Products" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
        <Stack direction="row" sx={{ gap: { lg: "107px", xs: "50px" } }} flexWrap="wrap" justifyContent="center">
          {currentProducts.map((product, idx) => (
            <Product_card key={idx} product={product} />
          ))}
        </Stack>
        <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
          {products.length > 9 && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(products.length / productsPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
            />
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default Home;
