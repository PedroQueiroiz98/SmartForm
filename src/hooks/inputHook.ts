import React, {useEffect, useState , useCallback } from 'react';


import {validatorOBJ} from '../validator/validator';

export interface Masc{
    (value:string):string;
}

export function useInputHook(value:string | number, rules?:validatorOBJ[],masc?:Masc){

    const [inputValue, setInputValue] = useState<string | number>(value);
    const [messageError,setMessageError] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const [touch, setTouch] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);

    useEffect(()=>{
        if(touch){
           if(rules !== undefined && rules.length){
                setValid(rules.every(rule=>{
                    const result = rule.validator(inputValue);
                    if(!result){
                        setMessageError(rule.message);
                    }else{
                      setMessageError("");
                    }
                    return result;
                }));
            }
           }
    },[inputValue,touch,rules])

    useEffect(()=>{
        setInputValue(value)
    },[value])
    
    function handlerFocus(){
        setTouch(true);
        setFocus(true);
    }

    function handlerBlur(){
        setFocus(false);
    }

    function handlerChange(event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        const { target } = event;
            setInputValue(()=>{
              if(masc){
               return masc(target.value);
              }
              return target.value;
            });
      }
      const resetState = useCallback(()=>{
        setFocus(false);
        setTouch(false);
        setValid(false);
        setMessageError("");
        setInputValue((oldInput)=>{
            return typeof oldInput === "number"?0:""
        })
        },[]);
    
    return {
        inputValue,
        messageError,
        focus,
        touch,
        valid,
        handlerFocus,
        handlerBlur,
        handlerChange,
        resetState
    }

}