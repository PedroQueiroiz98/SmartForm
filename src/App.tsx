import React,{useEffect,useState} from 'react';
import Form from './Components/form';
import Input from './Components/inputs';
import Select from './Components/select';


interface Person{
  name:string;
  lastName:string;
  cpf:string;
  gener:string;
}
interface D{
  id:number,
  name:string;
}

const App: React.FC = () => {
  const [data,setData] = useState<D[]>([]);
  const validate = ()=>{
    return (value:string | number)=>value !== "";
  };
  const legth = (len:number)=>{
      return (value:string | number)=>value.toString().length < len;
  }

  useEffect(()=>{
      setTimeout(()=>{
          console.log('load data');
          setData([
            {
              id:1,
              name:"dsad"
            },
            {
              id:3,
              name:"dsad"
            },
          ]);
      },5000)
  },[])
  return (
    <div className="App">
        <Form listen = {(data:Object,valid:boolean)=>{
            const personData = data as Person;
            console.log(personData);
        }}>
            <Input 
              label = "Nome"
              name = "name" 
              messageError = "Erro nome"
              rules = {[
              validate(),
              legth(5)
            ]}/>
            <Input 
            label = "SobreNome"
            name = "lastName"
            messageError = "Erro nome"
            rules = {[
              validate(),
              legth(5)
            ]}
            />
            <Input 
            label = "Cpf"
            name = "cpf"
            messageError = "Erro nome"
            rules = {[
              validate(),
              legth(5)
            ]}
            />
            <Select
            label = "Genero"
            name = "gener" 
            messageError = "Erro nome"
            rules = {[
              validate(),
            ]}>
              {
                data.map(d=>{
                return <option value = {d.id} key = {d.id}>{d.name}</option>
                })
              }
            </Select>
            <button type= "submit">send</button>
        </Form>
    </div>
  );
}

export default App;
