import React, {useCallback, useState ,useRef } from 'react';
import context from './context';
import {validatorOBJ} from '../../validator/validator';


export interface Props{
    children?:React.ReactNode[],
    listen:(data:Object,valid:boolean)=>void;
    reset:()=>void;
}

export interface Input{
    name:string;
    ref:HTMLInputElement | HTMLSelectElement,
    roleValidate?:validatorOBJ[],
    reset:()=>void;
}

const Form:React.FC<Props> = ({children,listen,reset})=>{

    const [inputs,setInputs] = useState<Input[]>([]);

    const ref = useRef<HTMLFormElement>(null);

    const registerInput = useCallback((input:Input)=>{
        setInputs(oldInputs=>[...oldInputs,input])
    },[]);

    function handlerSubmit(event:React.FormEvent){ 
        event.preventDefault();
        listen(
            createValues(),
            inputsIsValid()
        );
    }
    function createValues(){
        const value = Object.create({});
        inputs.forEach(input=>{
            value[`${input.name}`] = input.ref.value
        })
        return value;
    }
    function inputsIsValid():boolean{
        return inputs.every(input=>{
            return input.roleValidate?.every(rule=>{
                return rule.validator(input.ref.value);
            });
        });
    }
    function handlerReset(){
        ref.current?.reset();
        reset();
        inputs.forEach(input=>{
            input.reset();
        })
    }
    return(
        <form
            ref = {ref} 
            onSubmit ={handlerSubmit} 
            onReset = {handlerReset}>
            <context.Provider value = {{
                registerInput
            }}>
            {
                children
            }
            </context.Provider>
        </form>
    );
}
export default Form;