import React, { useEffect, useRef, useContext, useState } from "react";
import context, { FormContext } from "../form/context";
import {SmartInput} from './style';

export interface Rule{
    (value:string | number):boolean;
}
type Props = {
  name: string;
  rules?:Rule[],
  label:string;
  messageError:string;
};

const Input: React.FC<Props> = ({ name, rules, label,messageError}) => {

  const [value, setValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [touch, setTouch] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);
  const { registerInput } = useContext<FormContext>(context);

  useEffect(() => {
    registerInput({
        name: name,
        ref: ref.current!,
        roleValidate:rules
      });
  }, [registerInput,name,rules]);
  useEffect(()=>{
        if(touch){
           if(rules !== undefined && rules.length){
                setValid(rules.every(rule=>{
                    return rule(value);
                }));
            }
           }
  },[value,touch,rules])
 function handlerFocus(){
    setTouch(true);
    setFocus(true);
 }

 function handlerBlur(){
    setFocus(false);
 }

  return (
    <div>
      <label>{label}</label>
      <SmartInput
      name = {name}
      ref={ref}
      value={value}
      onChange={({ target }) => {
        setValue(target.value);
      }}
      onFocus = {handlerFocus}
      onBlur = {handlerBlur}
      touch = {touch}
      focus = {focus}
      valid = {valid}
    />
      {
        !valid && touch?<span>{messageError}</span>:null
      }
    </div>
  );
};
export default Input;
