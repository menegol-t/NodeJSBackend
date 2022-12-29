import mongoose from "mongoose"

const productsCollection = "product"

export interface IProduct{
    title: string;
    price: number;
    thumbnail: string;
    stock: number;
    description: string;
}

const productSchema = new mongoose.Schema<IProduct>(
    {
        title: {},
        price: {},
        thumbnail: {},
        stock: {},
        description: {},
    },
    {timestamps: true, versionKey: false}
)

export const ProductsModel = mongoose.model<IProduct>(
    productsCollection, productSchema
)