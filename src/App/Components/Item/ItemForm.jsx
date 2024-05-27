// src/components/ItemForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../../utils/itemsSlice';
import './ItemForm.css';

const ItemForm = ({ currentItem, setCurrentItem }) => {
    const [name, setName] = useState(currentItem ? currentItem.name : '');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentItem) {
            setName(currentItem.name);
        }
    }, [currentItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentItem) {
            dispatch(updateItem({ id: currentItem.id, updatedItem: { id: currentItem.id, name } }));
            setCurrentItem(null);
        } else {
            dispatch(addItem({ name }));
        }
        setName('');
    };

    return (
        <form className="item-form" onSubmit={handleSubmit}>
            <h2 className="form-title">{currentItem ? 'Edit Item' : 'Add New Item'}</h2>
            <label htmlFor="name">Product Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter item name"
                className="form-input"
                required
            />
            <div className="button-container">
                <button type="submit" className="submit-button">{currentItem ? 'Update' : 'Add'}</button>
                {currentItem && (
                    <button type="button" className="cancel-button" onClick={() => setCurrentItem(null)}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ItemForm;
