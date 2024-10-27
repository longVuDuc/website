import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Box, Divider, Button, CircularProgress } from '@mui/material';
import ResponsiveAppBar from "../components/NavBar";
import axios from "axios";

function Product_Detail() {
    const { id } = useParams();
    const [Product_name, setProduct_name] = useState(null);
    const [imagePath, setImagePath] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [Price, setPrice] = useState('');
    const [DescriptionLines, setDescriptionLines] = useState([]);
    const [showDescription, setShowDescription] = useState(true);
    const [loading, setLoading] = useState(true);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('de-DE').format(price);
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            setLoading(true); 
            try {
                const ProductResponse = await axios.get(`http://127.0.0.1:8000/api/getProduct/${id}`);
                const productData = ProductResponse.data;

                setProduct_name(productData.name);

                const imagePaths = [
                    productData.file_path1,
                    productData.file_path2,
                    productData.file_path3,
                    productData.file_path4
                ].filter(Boolean);

                setImagePath(imagePaths[0]);
                setThumbnails(imagePaths);
                setPrice(productData.price);

                const lines = productData.description.split('.');
                setDescriptionLines(lines);

                window.scrollTo({ top: 100, left: 100, behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleThumbnailClick = (thumbnail) => {
        setImagePath(thumbnail);
    };

    const showProductDescription = () => {
        setShowDescription(true);
    };

    const showHowToOrder = () => {
        setShowDescription(false);
    };

    return (
        <Stack mb={'300px'}>
            <ResponsiveAppBar />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Stack direction={'row'}>
                        <Box>
                            <Box sx={{
                                border: '1px solid #ccc',
                                mt: '10%',
                                ml: '5%',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                },
                                overflow: 'hidden',
                            }}>
                                <img
                                    src={`http://127.0.0.1:8000/${imagePath}`}
                                    alt={Product_name}
                                    loading='lazy'
                                    style={{ width: '100%', display: 'block' }}
                                />
                            </Box>
                            <Stack direction="row" spacing={2} mt={2} ml={"5%"} maxWidth={'100%'}>
                                {thumbnails.map((thumbnail, index) => (
                                    <Box key={index} sx={{ border: imagePath === thumbnail ? '2 px solid lightblue' : '1px solid #ccc', cursor: 'pointer', overflow : "hidden" }}>
                                        <img
                                            src={`http://127.0.0.1:8000/${thumbnail}`}
                                            alt={`thumbnail ${index}`}
                                            style={{ width: 120, height: '100%', objectFit: 'cover' }}
                                            onClick={() => handleThumbnailClick(thumbnail)}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                        <Box sx={{
                            mt: '8%',
                            ml: '15%',
                            width: '30%'
                        }}>
                            <Typography sx={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                            }}>
                                {Product_name}
                            </Typography>
                            <Divider sx={{ borderBottomWidth: 2, marginY: 2 }}  />
                            <Typography variant="h5" color='green'> {formatPrice(Price)} VND </Typography>
                        </Box>
                    </Stack>
                    <Stack mt={4} mx={5} direction="row"
                            divider={<Divider orientation="vertical" flexItem />}
                            spacing={2}
                            useFlexGap
                            sx={{ flexWrap: 'wrap' }}
                            justifyContent={'center'}
                        >
                        <Button variant="outlined" onClick={showProductDescription}>
                            Mô tả sản phẩm
                        </Button>
                        <Button variant="outlined" onClick={showHowToOrder} sx={{ ml: 2 }}>
                            Cách đặt Hàng
                        </Button>
                    </Stack>
                    {showDescription ? (
                        <Stack mt={4} mx={5} ml={10} mr={10}>
                            <Typography variant="h5">Mô tả sản phẩm:</Typography>
                            <Divider sx={{ borderBottomWidth: 1, marginY: 2 }} />
                            {DescriptionLines.map((line, index) => (
                                <Typography key={index} variant="body1" paragraph>{line}</Typography>
                            ))}
                        </Stack>
                    ) : (
                        <Stack mt={4} mx={5} >
                            <Typography variant="h5">Cách đặt hàng:</Typography>
                            <Divider sx={{ borderBottomWidth: 1, marginY: 2 }} />
                            <Typography variant="body1">
                                Để đặt hàng, vui lòng làm theo các bước sau:
                            </Typography>
                            <Typography variant="body1">
                                1. Chọn sản phẩm bạn muốn mua.
                            </Typography>
                            <Typography variant="body1">
                                2. Nhấn vào nút "Đặt hàng" bên dưới.
                            </Typography>
                            <Typography variant="body1">
                                3. Hoàn tất thông tin giao hàng và thanh toán.
                            </Typography>
                        </Stack>
                    )}
                </>
            )}
        </Stack>
    );
}

export default Product_Detail;
