import React, {useCallback, useState } from 'react';
import context from './context';
import {Rule} from '../inputs/index';

export interface Props{
    children?:React.ReactNode,
    listen:(data:Object,valid:boolean)=>void;
}
export interface Input{
    name:string;
    ref:HTMLInputElement | HTMLSelectElement,
    roleValidate?:Rule[]
}
const Form:React.FC<Props> = ({children,listen})=>{
    const [inputs,setInputs] = useState<Input[]>([]);
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
                return rule(input.ref.value);
            });
        });
    }
    return(
        <form onSubmit ={handlerSubmit}>
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