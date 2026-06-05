import { CartRepositoryType } from "../types/repository.type"

const createCart = async (input:any):Promise<{}>=>{
    return Promise.resolve("cart created");

}
const updateCart = async (input:any):Promise<{}>=>{
    return Promise.resolve("cart updated");

}
const getCart = async (input:any):Promise<{}>=>{
    return Promise.resolve("cart getCart");

}
const deleteCart = async (input:any):Promise<{}>=>{
    return Promise.resolve("cart deleted");

}

export const cardRepository:CartRepositoryType = {
    create: createCart,
    find:getCart,
    update:updateCart,
    delete: deleteCart
}

