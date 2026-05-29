import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError,  validate } from "class-validator";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { error } from "node:console";


//request validator se ek plaintoclass se bana hua ek input class ayega jo kisi bhi type ka ho sakta hain.
const validationError = async(input:any):Promise<ValidationError[] |false>=>{
    
    //jo input class aya hain usko hum
    const errors = await validate(input,{validationError:{target:true}});
    //agar error hain to return mein validationerror ka array jayega. kyuki method async hain to return Promise mein jayega.

    if(errors.length){
        return errors;
    }
    //agar koi error nhi hain to return mein false jayega.

    return false;



}
//request validator mein data ransfer class ka type jayega and ek object Body Jayegi.

export const requestValidator = async<T>(type:ClassConstructor<T>, body:any):Promise<{error:boolean|string,input:T}>=>{
        //plaintoClass ek DTO CLASS Type and body ek input class ban jayegi.

        const input = plainToClass(type, body);
        console.log("input of plaintoclass :->",input);

        // yaha pe upar ka validation error call hoga. isse validation error ka array ayega
        const errors = await validationError(input);
        console.log("errors :->", errors)
        if(errors)
        {
            // validation error ke array se ek map banaya 
            const errorMessage = errors.map((error:ValidationError)=>
                    (Object as any).values(error.constraints)).join(", ");
                
            console.log("errorMessage :", errorMessage);
            return {error:errorMessage, input}
                
        }

        return {error:false, input}
}

