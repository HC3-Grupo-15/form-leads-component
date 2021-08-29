import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useCssHandles } from 'vtex.css-handles'


// const CSS_HANDLES = ['container', 'title', 'form', 'input', 'button', 'registered']

const api = axios.create({
  baseURL: "https://briitogabriel--hiringcoders202115.myvtex.com"
})

const LeadsList = () => {

  const [list, setList] = useState(Array);
  let lista = [];

  //POR ALGUM MOTIVO NÃO ESTÁ SETANDO O LIST DEPOIS DE FAZER A REQUISIÇÃO
  //o array LISTA está recebendo os dados corretos (conforme console), porém não entra no setList
  useEffect(() => {
    let mounted = true;
    api.get("/leads")
    .then(res => {
      lista = res.data;
      if(mounted){
        setList(lista);
      }
      console.log(lista.Items);
      console.log(list);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

//   const handles = useCssHandles(CSS_HANDLES)

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
          <tr>
            <td align="center">073219834</td>
            <td align="center">Client</td>
            <td align="center">User 1</td>
            <td align="center">user1@gmail.com</td>
            <td align="center">+554892265-6354</td>
          </tr>
          <tr>
            <td align="center">54351324</td>
            <td align="center">Lead</td>
            <td align="center">User 2</td>
            <td align="center">user2@gmail.com</td>
            <td align="center">+551143265-9341</td>
          </tr>
          <tr>
            <td align="center">75166741</td>
            <td align="center">Client</td>
            <td align="center">User 3</td>
            <td align="center">user3@gmail.com</td>
            <td align="center">+551265405-6734</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default LeadsList