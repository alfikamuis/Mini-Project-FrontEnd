export interface IProduct {
    id: number,
    name: string,
    category: string | null,
    description: string,
    image: string,
    price: number,
    quantity: number,
    images: string,
}

export interface IResponseProduct {
    count: number,
    products: IProduct[],
}