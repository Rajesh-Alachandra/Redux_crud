// src/components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../utils/productsSlice';
import './ProductList.css';

const ProductList = ({ setCurrentProduct }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const productStatus = useSelector((state) => state.products.status);

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img className="product-image" src={product.image} alt={product.name} />
                        <div className="product-details">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${product.price}</p>
                        </div>
                        <div className="product-actions">
                            <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
