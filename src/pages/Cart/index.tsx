import { useEffect } from 'react';

import { Products } from '../../components/Products';
import { Receipt } from '../../components/Receipt';
import { fetchCartItems } from '../../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import './cart.css';

export const Cart = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.cart.cartItems);
    const { total } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, []);

    return (
        <div className="cart">
            <div className="cart__header">Shopping cart</div>
            <div className="cart__content">
                <div className="cart__products">
                    <Products products={products} />
                </div>
                <div className="cart__receipt">
                    <Receipt />
                </div>
            </div>
            <div className="cart__footer">
                <div className="cart__footer-left">
                    <button className="cart__footer-button">Go to checkout</button>
                </div>
                <div className="cart__footer-right">Sub Total: ${total.toFixed(2)}</div>
            </div>
        </div>
    );
};
