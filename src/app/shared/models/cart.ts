import { IProduct, IResponseProduct } from "./product";

export interface ICartServer {
    total: number;
    data: [{
        product?: IProduct;
        numInCart: number;
    }]
}

export interface ICart {
    total: number;
    prodData: [{
        id: any;
        incart: any;
    }];
}