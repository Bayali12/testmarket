import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../../types';
import axios from '../../api';
import { calculateTotal } from '../../helpers/calculateTotal';

interface ICartState {
    cartItems: ICartItem[];
    total: number;
    isLoading: boolean;
}

const initialState: ICartState = {
    cartItems: [],
    total: 0,
    isLoading: false,
};

export const fetchCartItems = createAsyncThunk<ICartItem[]>('cart/fetchCartItems', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/product');
        return response.data as ICartItem[];
    } catch (error) {
        throw rejectWithValue({
            error: 'Failed to fetch cart items',
        });
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state, { payload }: PayloadAction<string>) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === payload);
            if (itemIndex !== -1) [state.cartItems[itemIndex].quantity++];
            state.total = calculateTotal(state.cartItems);
        },
        decrementQuantity: (state, { payload }: PayloadAction<string>) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === payload);
            if (itemIndex !== -1) [state.cartItems[itemIndex].quantity--];
            state.total = calculateTotal(state.cartItems);
        },
        onChangeQuantity: (state, { payload }: PayloadAction<{ id: string; quantity: number }>) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === payload.id);
            if (itemIndex !== -1) state.cartItems[itemIndex].quantity = payload.quantity;
            state.total = calculateTotal(state.cartItems);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            state.total = calculateTotal(state.cartItems);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload;
            state.total = calculateTotal(action.payload);
        });

        builder.addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const cartReducer = cartSlice.reducer;
export const { incrementQuantity, decrementQuantity, onChangeQuantity, removeItem } = cartSlice.actions;
