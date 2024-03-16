import { FC } from 'react';

import './receiptItem.css';

interface IReceiptItemProps {
    title: string;
    price: number;
    quantity: number;
}

export const ReceiptItem: FC<IReceiptItemProps> = ({ title, price, quantity }) => {
    return (
        <div className="receiptItem">
            <span className="receiptItem__title">{title}</span>
            <span className="receiptItem__price">${price}</span>
            <span className="receiptItem__quantity">{quantity}</span>
            <span className="receiptItem__sum">${(quantity * price).toFixed(2)}</span>
        </div>
    );
};
