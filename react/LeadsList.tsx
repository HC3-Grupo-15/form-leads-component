import React, { useState, useEffect } from 'react'
import axios from 'axios'

type Lead = {
  id: string
  category: string
  name: string
  email: string
  phoneNumber: string
  dateBecameLead: string
  dateBecomeClient: string
}

export default function LeadsList() {
  const [listLeads, setListLeads] = useState([])

  const api = axios.create({
    baseURL: 'https://stenioas--hiringcoders202115.myvtex.com',
  })

  useEffect(() => {
    api
      .get('leads')
      .then((response) => {
        setListLeads(response.data.Items)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <h1>Leads List</h1>
      <table width="90%">
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>TIPO</th>
            <th>TELEFONE</th>
          </tr>
        </thead>
        <tbody>
          {listLeads
            ? listLeads.map((item: Lead, index: number) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.category}</td>
                    <td>{item.phoneNumber}</td>
                  </tr>
                )
              })
            : 'Nenhum registro encontrado!'}
        </tbody>
      </table>
    </>
  )
}
