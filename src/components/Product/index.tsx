import { ChangeEvent, FC } from 'react';

import { ICartItem } from '../../types';
import deleteIcon from '../../assets/delete.svg';
import { decrementQuantity, incrementQuantity, onChangeQuantity, removeItem } from '../../store/slices/cartSlice';
import { useAppDispatch } from '../../hooks';

import './product.css';

export const Product: FC<ICartItem> = ({ id, title, description, imageUrl, price, quantity }) => {
    const dispatch = useAppDispatch();

    const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
        const { min, max, value } = event.target;

        const newValue = Math.max(Number(min), Math.min(Number(max), Number(value)));

        dispatch(onChangeQuantity({ id, quantity: newValue }));
    };

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            dispatch(removeItem(id));
        }
    };

    return (
        <div className="product">
            <div className="product__image">
                <img src={imageUrl} alt="" />
            </div>
            <div className="product__info">
                <span className="product__title">{title}</span>
                <span className="product__description">{description}</span>
                <span className="product__price">${price}</span>
            </div>
            <div className="product__actions">
                <button
                    className="product__actions-button product__actions-button--increment"
                    disabled={quantity === 10}
                    onClick={() => dispatch(incrementQuantity(id))}>
                    +
                </button>
                <input
                    className="product__actions-input"
                    type="number"
                    max={10}
                    min={1}
                    value={quantity}
                    onChange={handleChangeQuantity}
                />
                <button
                    className="product__actions-button product__actions-button--decrement"
                    disabled={quantity === 1}
                    onClick={() => dispatch(decrementQuantity(id))}>
                    -
                </button>
                <button className="product__actions-button product__actions-button--delete" onClick={handleDelete}>
                    <img src={deleteIcon} alt="delete" />
                </button>
            </div>
        </div>
    );
};
