import { createSlice } from '@reduxjs/toolkit';

// Helper function to get the cart from localStorage
const loadCartFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Failed to load cart from localStorage:', err);
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromLocalStorage(), // Load cart from localStorage
    },
    reducers: {
        addToCart: (state, action) => {
            // Build a stable, unique key from the product id + its variant
            // (selectedGram). Don't trust the caller to have already set a
            // unique cartItemId — if every new item arrives with the same
            // (or missing) cartItemId, they'll all match each other and
            // overwrite instead of being added as separate lines.
            const newItem = { ...action.payload };
            if (!newItem.cartItemId) {
                newItem.cartItemId = `${newItem.id}-${newItem.selectedGram ?? 'default'}`;
            }

            const itemIndex = state.items.findIndex(
                item => item.cartItemId === newItem.cartItemId
            );

            if (itemIndex >= 0) {
                // Same product + same variant already in cart: merge/update
                // (e.g. bump quantity) instead of adding a duplicate line.
                state.items[itemIndex] = { ...state.items[itemIndex], ...newItem };
            } else {
                // Different product, or same product with a different
                // variant: add as a new line.
                state.items.push(newItem);
            }

            try {
                localStorage.setItem('cart', JSON.stringify(state.items));
            } catch (err) {
                console.error('Failed to save cart to localStorage:', err);
            }
        },
        removeFromCart: (state, action) => {
            // Fix: was filtering on item.id, but Cart.js/CartItemCard.js
            // pass cartItemId — the actual unique key for each cart line.
            state.items = state.items.filter(item => item.cartItemId !== action.payload);
            try {
                localStorage.setItem('cart', JSON.stringify(state.items));
            } catch (err) {
                console.error('Failed to save cart to localStorage:', err);
            }
        },
        clearCart: (state) => {
            state.items = [];
            try {
                localStorage.removeItem('cart');
            } catch (err) {
                console.error('Failed to remove cart from localStorage:', err);
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;