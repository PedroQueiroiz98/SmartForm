import React, { useEffect, useRef, useContext } from "react";
import context, { FormContext } from "../form/context";
import {SmartInput} from './style';

import {validatorOBJ} from '../../validator/validator';

import {useInputHook} from '../../hooks/inputHook';

export interface Rule{
    (value:string | number):boolean;
}
export interface Masc{
  (value:string):string;
}
type Props = {
  name: string;
  value:string | number;
  type:string;
  rules?:validatorOBJ[],
  masc?:Masc
  label:string;
};

const Input: React.FC<Props> = ({ name, type, value ,rules, label, masc}) => {

  const {  
    inputValue,
    messageError,
    focus,
    touch,
    valid,
    handlerFocus,
    handlerBlur,
    handlerChange,
    resetState
  } = useInputHook(value, rules, masc);


  const ref = useRef<HTMLInputElement>(null);

  const { registerInput } = useContext<FormContext>(context);

  useEffect(() => {
    registerInput({
        name: name,
        ref: ref.current!,
        roleValidate:rules,
        reset:resetState
      });
  }, [registerInput,name,rules,resetState]);

  return (
    <div>
      <label>{label}</label>
      <SmartInput
      type = {type}
      name = {name}
      ref={ref}
      value={inputValue}
      onChange={handlerChange}
      onFocus = {handlerFocus}
      onBlur = {handlerBlur}
      touch = {touch}
      focus = {focus}
      valid = {valid}
    />
      {
        !valid && touch && !focus?<span>{messageError}</span>:null
      }
    </div>
  );
};
export default Input;
