import { useAppSelector } from '../../hooks';
import { ReceiptItem } from '../ReceiptItem';

import './receipt.css';

export const Receipt = () => {
    const products = useAppSelector((state) => state.cart.cartItems);

    return (
        <div className="receipt">
            <div className="receipt__header">
                <span className="receipt__item">item</span>
                <span className="receipt__price">price</span>
                <span className="receipt__quantity">qty</span>
                <span className="receipt__total">total</span>
            </div>
            <div className="receipt__items">
                {products.map((product) => (
                    <ReceiptItem
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        quantity={product.quantity}
                    />
                ))}
            </div>
        </div>
    );
};
