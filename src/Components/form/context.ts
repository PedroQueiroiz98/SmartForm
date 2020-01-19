import React from 'react';
import {Input} from '../form/index';


export type FormContext = {
    registerInput:(input:Input)=>void;
}
const context = React.createContext<FormContext>({
    registerInput:(input:Input)=>{

    }
});
export default context;