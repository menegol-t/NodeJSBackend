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
        title: {type: String, required: true, maxlength: 2},
        price: {type: Number, required: true, max: 50},
        thumbnail: {type: String, required: true},
        stock: {type: Number, required: true, max: 50},
        description: {type: String, required: true, max: 500},
    },
    {timestamps: true, versionKey: false}
)

export const ProductsModel = mongoose.model<IProduct>(
    productsCollection, productSchema
)