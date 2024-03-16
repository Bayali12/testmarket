import { ICartItem } from '../types';

export const calculateTotal = (items: ICartItem[]) =>
    items.reduce((acc, current) => acc + current.price * current.quantity, 0);
