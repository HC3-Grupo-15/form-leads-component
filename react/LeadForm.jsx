import React from "react";
import axios from "axios";

const LeadForm = ({ }) => {

  const api = axios.create({
    baseURL: "hiringcoders202115.myvtex.com"
  })

  const handleSubmit = async (data) => {
    // await api.post('/leads', {
    //   name: data.name,
    //   email: data.email,
    //   telephone: data.telephone
    // })
    alert(data.name)
  }

  return (
    <div>
      <h1>Receba promoções!</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input type="text" name="name" required={true} />
        <label>Email</label>
        <input type="email" name="email" required={true} />
        <label>Telefone</label>
        <input type="tel" required={true} />
        <button type="submit" name="telephone" >Enviar</button>
      </form>
    </div>
  )
}

export default LeadForm