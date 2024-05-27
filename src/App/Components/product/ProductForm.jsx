// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../utils/productsSlice';
import './ProductForm.css';

const ProductForm = ({ currentProduct, setCurrentProduct }) => {
    const [name, setName] = useState(currentProduct ? currentProduct.name : '');
    const [description, setDescription] = useState(currentProduct ? currentProduct.description : '');
    const [price, setPrice] = useState(currentProduct ? currentProduct.price : '');
    const [image, setImage] = useState(currentProduct ? currentProduct.image : '');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentProduct) {
            setName(currentProduct.name);
            setDescription(currentProduct.description);
            setPrice(currentProduct.price);
            setImage(currentProduct.image);
        }
    }, [currentProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, description, price, image };
        if (currentProduct) {
            dispatch(updateProduct({ id: currentProduct.id, updatedProduct: product }));
            setCurrentProduct(null);
        } else {
            dispatch(addProduct(product));
        }
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
    };

    return (
        <form className='product-form' onSubmit={handleSubmit}>
            <h2 className="form-title">{currentProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <label htmlFor="name">Product Name:</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
            />
            <label htmlFor="description">Product Description:</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                required
            />
            <label htmlFor="price">Product Price:</label>
            <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter product price"
                required
            />
            <label htmlFor="image">Product Image URL:</label>
            <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter product image URL"
                required
            />
            <div className="button-container">
                <button type="submit">{currentProduct ? 'Update' : 'Add'}</button>
                {currentProduct && (
                    <button type="button" onClick={() => setCurrentProduct(null)}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;
