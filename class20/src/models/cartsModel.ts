import mongoose from "mongoose";

export const cartCollection = "cart"

interface ICart {
    products: []
}

const cartSchema = new mongoose.Schema<ICart>(
    {products: {type: [], required: true}},
    {timestamps: true, versionKey: false}
)

export const CartModel = mongoose.model<ICart>(cartCollection, cartSchema)