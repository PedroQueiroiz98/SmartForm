import React, { useEffect, useRef, useContext } from "react";
import context, { FormContext } from "../form/context";
import {SmartSelect} from './style';

import {useInputHook} from '../../hooks/inputHook';


import {validatorOBJ} from '../../validator/validator'


export interface Rule{
    (value:string | number):boolean;
}
type Props = {
  name: string;
  value: string;
  rules?:validatorOBJ[],
  children:React.ReactNode[],
  label:string;
};

const Select: React.FC<Props> = ({ name, value, rules, children,label}) => {

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
  } = useInputHook(value, rules);

  const ref = useRef<HTMLSelectElement>(null);
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
      <SmartSelect
      name = {name}
      ref={ref}
      value={inputValue}
      onChange={handlerChange}
      onFocus = {handlerFocus}
      onBlur = {handlerBlur}
      touch = {touch}
      focus = {focus}
      valid = {valid}
      >
          {
           children.length > 0?  <option value = "not select">Selecione {label}.</option>:null
          }
          {
            children.length > 0? children:<option>Carregando {label}...</option>
          }
      </SmartSelect>
      {
        !valid && touch?<span>{messageError}</span>:null
      }
    </div>
  );
};
export default Select;
