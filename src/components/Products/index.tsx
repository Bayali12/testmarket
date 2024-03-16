import { FC } from 'react';

import { ICartItem } from '../../types';

import './products.css';
import { Product } from '../Product';

interface IProductProps {
    products: ICartItem[];
}

export const Products: FC<IProductProps> = ({ products }) => {
    return (
        <div className="products">
            {products.map((product) => (
                <Product
                    key={product.id}
                    title={product.title}
                    quantity={product.quantity}
                    id={product.id}
                    description={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    );
};
