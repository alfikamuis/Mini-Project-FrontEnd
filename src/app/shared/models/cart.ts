export interface ICart {
    id: number;
    createdAt: number;
    items:IItems;
}

export interface IItems {
    id: number,
    productId: number,
    title: string,
    price: number,
    quantity: number,
    userId: number,
}
// export interface IItems{
//     id: number;
//     title: string;
//     price: number;
//     category: string;
//     imageUrl: string;
//     quantity: number;
// }

export interface IProductCart {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}