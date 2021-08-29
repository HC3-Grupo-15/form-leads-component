import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useCssHandles } from 'vtex.css-handles'


// const CSS_HANDLES = ['container', 'title', 'form', 'input', 'button', 'registered']
interface Client{
  id: string,
  category: string,
  name: string,
  email: string,
  phoneNumber: string,
  dateBecameLead: string,
  dateBecomeClient: string
}



const api = axios.create({
  baseURL: "https://juliabrz--hiringcoders202115.myvtex.com"
})

const LeadsList =  () => {

  const [listLeads, setListLeads] = useState(Array());
  let lista;

  //POR ALGUM MOTIVO NÃO ESTÁ SETANDO O LIST DEPOIS DE FAZER A REQUISIÇÃO
  //o array LISTA está recebendo os dados corretos (conforme console), porém não entra no setList
  useEffect( () => {
    let mounted = true;
    api.get("/leads")
    .then(res => {
      lista = res.data;
      console.log(lista)
      if(mounted){
        console.log(lista.Items);
        setListLeads(lista.Items);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  console.log(listLeads)
  // const handles = useCssHandles(CSS_HANDLES)

  const renderItems = () => {
    return listLeads.map((item:Client, index:number) => {
      return (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.category}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phoneNumber}</td>
          </tr>
      )
    })
  }

  const renderVazio = () => {
    return (
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
        )
      }

  return (
    <>
      <h1>Leads List</h1>
      {/* Depois de completar o setList, necessário map para exibir leads */}
      <table width="90%">
        <thead>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
            <th>NAME</th>
            <th>E-MAIL</th>
            <th>PHONE NUMBER</th>
          </tr>
        </thead>
        <tbody>
          {listLeads !== [] ? renderItems : renderVazio}
        </tbody>
      </table>
    </>
  )
}

export default LeadsList