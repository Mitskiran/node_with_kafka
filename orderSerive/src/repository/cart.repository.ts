import { CartRepositoryType } from "../types/repository.type"


const createCart = async (input:any):Promise<{}>=>{
    
    return Promise.resolve({message:"cart created"});

}
const updateCart = async (input:any):Promise<{}>=>{
    return Promise.resolve({message:"cart updated"});

}
const getCart = async (input:any):Promise<{}>=>{
    return Promise.resolve({message:"cart getCart"});

}
const deleteCart = async (input:any):Promise<{}>=>{
    return Promise.resolve({message:"cart deleted"});

}

export const cartRepository:CartRepositoryType = {
    create: createCart,
    find:getCart,
    update:updateCart,
    delete: deleteCart
}

