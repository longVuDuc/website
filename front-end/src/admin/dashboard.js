import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', description: '', files: [] });
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/List');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleFileChange = (event) => {
        setForm({ ...form, files: Array.from(event.target.files) });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        form.files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file); // Start index from 1
        });

        try {
            await axios.post('http://localhost:8000/api/addProduct', formData);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        form.files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file); // Start index from 1
        });

        try {
            await axios.put(`http://localhost:8000/api/update/${currentProductId}`, formData);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const editProduct = (product) => {
        setEditMode(true);
        setCurrentProductId(product.id);
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
            files: [], // Reset files for editing
        });
    };

    const resetForm = () => {
        setForm({ name: '', price: '', description: '', files: [] });
        setEditMode(false);
        setCurrentProductId(null);
    };

    return (
        <Container>
            <h1>Product Dashboard</h1>
            <form onSubmit={editMode ? updateProduct : addProduct} encType="multipart/form-data">
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" fullWidth margin="normal" />
                <TextField label="Description" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />
                <input type="file" multiple onChange={handleFileChange} />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    {editMode ? 'Update Product' : 'Add Product'}
                </Button>
            </form>

            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Images</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>
                                    {[product.file_path1, product.file_path2, product.file_path3, product.file_path4].map((path, index) => (
                                        path && <img key={index} src={`http://127.0.0.1:8000/${path}`} alt="Product" style={{ width: '50px', marginRight: '5px' }} />
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editProduct(product)}>
                                        <Edit color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteProduct(product.id)}>
                                        <Delete color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
export default Dashboard;
