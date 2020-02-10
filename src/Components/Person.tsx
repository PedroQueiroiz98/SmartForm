import React, {useState , useEffect} from 'react';

import Form from './form/index'; 
import Input from './inputs/index';
import Select from './select/index';

import {required, max, maxLength, min , email} from '../validator/validator';



interface PersonI {
    name:string;
    age:number;
    email:string;
    gener:string;
}

interface Ge{
    id:string;
    desc:string;
}

const Person:React.FC = ()=>{
 

    const [geners,setGeners] = useState<Ge[]>([]);
    const [data,setData] = useState<PersonI>({
        name:"",
        age:19,
        email:"",
        gener:"m"
    });

    useEffect(()=>{
        setTimeout(()=>{
            setData({
                name:"pedro",
                age:50,
                email:"",
                gener:"m"
            })

            setGeners([
                {
                    id:'m',
                    desc:"marculino"
                },
                {
                    id:'f',
                    desc:"feminino"
                },
            ])
        },5000)

    },[])
    function handlerForm(data:Object,valid:boolean){
        setData(data  as PersonI)
        if(valid){
            console.log('mandar salvar na api');
            return;
        }
        console.log('invalido');

    }
    return(
       <>
            <Form listen = {handlerForm} reset = {()=>{
                setData({
                    name:"",
                    age:19,
                    email:"",
                    gener:"not select"
                });
            }}>

            <Input  
                name = "id" 
                type = "number" 
                label = "id" 
                value = {0} 
                rules = {
                    [
                        min("Id invalido voçẽ deve informar numero positivo",0),
                        max("Esse numeroe muito grande para usar nesse campo",100)
                    ]
                }
                />
                <Input  
                name = "name" 
                type = "text" 
                label = "Name" 
                value = {data?.name} 
                rules = {
                    [
                        required("Preencha o nome do cliente por favor"),
                        maxLength("Nome muito grande",5)
                    ]
                }
                />
                 <Input  
                    name = "email" 
                    type = "email" 
                    label = "E-mail" 
                    value = {data?.email} 
                    rules = {
                        [
                            required("Preencha o email do cliente por favor"),
                            email("cara esse email está invalido, informe um email valido por favor")
                        ]
                    }
                />

                <Select 
                label = "Gênero" 
                name = "gener" 
                value = {data.gener}
                rules = {
                    [
                        required("Selecione um genero por favor"),
                    ]
                }
                >
                    {
                        geners.map(g=>{
                        return <option key = {g.id} value = {g.id} >{g.desc}</option>
                        })
                    }
                </Select>
                <button type = "submit">
                    Enviar
                </button>
                <button type = "reset">
                    Cancelar
                </button>
            </Form>
       </>
    );
}

export default Person;