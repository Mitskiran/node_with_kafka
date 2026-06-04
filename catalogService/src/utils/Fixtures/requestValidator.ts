import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";



const validationError  = async(input:any):Promise<ValidationError[]|false>=>{

    const errors  = await validate(input,{validationError:{target:true}});

    if(errors.length)
    {
        return errors
    }

    return false
}


export const validationRequest = async<T>(type:ClassConstructor<T>,body:any):Promise<{error:boolean|string, input:T}>=>{


    const input = await plainToClass(type, body);

    const errors = await validationError(input);

    if(errors)
    {
        const  errorMessages= errors.map((error:ValidationError)=>(Object as any).values(error.constraints)).join(", ")
        return {error:errorMessages, input}
    }

    return{error:false, input}

    
}