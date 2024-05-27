// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../utils/itemsSlice';
import productsReducer from '../utils/productsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        items: itemsReducer

    }
});

export default store;
