export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}

export interface ICartItem extends IProduct {
    quantity: number;
}
