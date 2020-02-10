export interface validatorFN {
    (value:string | number):boolean
}

export interface validatorOBJ{
    message:string;
    validator:validatorFN
}


export const email = (message:string):validatorOBJ=>{
    return {
        message,
        validator:(value:string | number):boolean=>{
            // eslint-disable-next-line
            const reg =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(value.toString());
        }
    };
}

export const required = (message:string):validatorOBJ=>{
    return {
        message,
        validator:(value:string | number):boolean=>{
            return value !== "" && value !== undefined && value !== null && value !== "not select"
        }
    };
}

export const maxLength = (message:string,max:number):validatorOBJ=>{
    return {
        message,
        validator:maxLengthFN(max)
    };
}
const maxLengthFN = (max:number):validatorFN=>{
    return (value:string | number)=>{
        return value.toString().length  <= max;
    }
}


export const min = (message:string,min:number):validatorOBJ=>{
    return {
        message,
        validator:minFN(min)
    };
}

const minFN  = (min:number):validatorFN=>{
    return (value:string | number)=>{
        return value >= min
    }
}

export const max = (message:string,max:number):validatorOBJ=>{
    return {
        message,
        validator:maxFN(max)
    };
}
const maxFN = (max:number):validatorFN=>{
    return (value:string | number)=>{
        return value <= max
    }
}
