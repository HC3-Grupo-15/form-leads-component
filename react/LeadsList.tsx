import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'leadsTable',
  'tableItem',
  'tableTitle',
  'tableRow',
] as const

type Lead = {
  id: string
  category: string
  name: string
  email: string
  phoneNumber: string
  dateBecameLead: string
  dateBecomeClient: string
}

const api = axios.create({
  baseURL: 'https://corebiz--hiringcoders202115.myvtex.com',
})

export default function LeadsList() {
  const [listLeads, setListLeads] = useState([])

  useEffect(() => {
    api
      .get('leads')
      .then((res) => {
        setListLeads(res.data.Items)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const handles = useCssHandles(CSS_HANDLES)

  return (
    <>
      <table className={handles.leadsTable}>
        <thead>
          <tr className={handles.tableRow}>
            <th className={handles.tableTitle}>TIPO</th>
            <th className={handles.tableTitle}>NOME</th>
            <th className={handles.tableTitle}>E-MAIL</th>
            <th className={handles.tableTitle}>TELEFONE</th>
          </tr>
        </thead>
        <tbody>
          {listLeads
            ? listLeads.map((item: Lead, index: number) => {
                return (
                  <tr key={index} className={handles.tableRow}>
                    <td className={handles.tableItem}>{item.category}</td>
                    <td className={handles.tableItem}>{item.name}</td>
                    <td className={handles.tableItem}>{item.email}</td>
                    <td className={handles.tableItem}>{item.phoneNumber}</td>
                  </tr>
                )
              })
            : 'Nenhum registro encontrado!'}
        </tbody>
      </table>
    </>
  )
}
