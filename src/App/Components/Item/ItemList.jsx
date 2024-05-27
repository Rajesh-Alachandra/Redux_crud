// src/components/ItemList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../../utils/itemsSlice';
import './Itemlist.css';

const ItemList = ({ setCurrentItem }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const itemStatus = useSelector((state) => state.items.status);

    useEffect(() => {
        if (itemStatus === 'idle') {
            dispatch(fetchItems());
        }
    }, [itemStatus, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteItem(id));
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
    };

    return (
        <div className="item-list-container">
            <h2>Item List</h2>
            <ul className="item-list">
                {items.map((item) => (
                    <li key={item.id} className="item">
                        <span>{item.name}</span>
                        <div className="item-actions">
                            <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
