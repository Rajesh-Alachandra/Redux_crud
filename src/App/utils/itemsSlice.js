// src/features/items/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';


// Async thunks
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await api.get('/items');
    return response.data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await api.post('/items', item);
    return response.data;
});

export const updateItem = createAsyncThunk('items/updateItem', async ({ id, updatedItem }) => {
    const response = await api.put(`/items/${id}`, updatedItem);
    return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await api.delete(`/items/${id}`);
    return id;
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            });
    }
});

export default itemsSlice.reducer;
