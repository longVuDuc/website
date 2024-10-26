import React, { useState, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; 

const ProductCard = ({ product }) => {
    const [image_path, setImagePath] = useState('');
    const formatPrice = (price) => {
        return new Intl.NumberFormat('de-DE').format(price);
      };
    useEffect(() => {
        if (product) {
            setImagePath(product.file_path);
        }
    }, [product]); 

    if (!product) return null; 
    return (
        <Link to={`/Product_Detail/${product.id}`} style={{ textDecoration: 'none' }}>
           <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    transition: '0.3s', 
                    '&:hover': {
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', 
                    },
                    overflow: 'hidden', 
                }}
                
            >
                <Box
                    sx={{
                        borderBottom: '2px solid #', 
                        overflow: 'hidden', 
                    }}
                >
                    <img
                        src={`http://127.0.0.1:8000/${image_path}`}
                        alt={product.name}
                        loading='lazy'
                        style={{ width: '100%', display: 'block' }}
                    />
                </Box>
                <Box   justifyContent={'center'} display="flex" flexDirection="column" alignItems="center" >
                    <Typography ml="21px" color="#000"  sx={{ fontSize: { lg: '26px', xs: '10px' } }} mt="11px" pb="10px" textTransform="capitalize">
                        {product.name}
                    </Typography>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', }} mb={'20px'}>
                        <Typography ml="18px" mr="18px" color="#4CBB17" sx={{ fontSize: { lg: '20px', xs: '16px' } }} mt="11px" pb="10px"   >
                            {formatPrice(product.price)} VND 
                        </Typography>
                    </Box>
                    
                </Box>
            </Box>
        </Link>
    );
};

export default ProductCard;
