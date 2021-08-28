import React, { FormEvent, useState } from "react";
import axios from "axios";

interface LeadFormProps {}

const LeadForm: StorefrontFunctionComponent<LeadFormProps> = ({ }) => {

  const api = axios.create({
    baseURL: "https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com"
  })
  
	const [hasRegistered, setHasRegistered] = useState(false);
	const [username, setUsername] = useState("");
	const [useremail, setUseremail] = useState("");
	const [telephone, setTelephone] = useState("");

  const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
			await api.post("/leads", {
        name: username,
        email: useremail,
        phoneNumber: telephone
			})
      
		setHasRegistered(true);
    }

    const handleRegister = () => {
      if (hasRegistered) {
        setHasRegistered(false);
        setUsername("");
        setUseremail("");
        setTelephone("");
      }
    }

//   POST /leads
// body: {
// 	"name": "Nome Completo",
// 	"phoneNumber": "547845632",
//   "email": "email@qualquercoisa.com"
// }

  return (
    <>
      <h1>Receba promoções!</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input type="text" name={username} onChange={() => setUsername(username)} required placeholder="Digite seu nome" />
        <label>Email</label>
        <input type="email" name="useremail" onChange={() => setUsername(useremail)} required placeholder="Digite seu e-mail" />
        <label>Telefone</label>
        <input type="tel" name="telephone" onChange={() => setUsername(telephone)} required placeholder="Digite seu telefone" />
        <button type="submit" onClick={() => {console.log(username)}} onSubmit={() => handleRegister}>Enviar</button>
      </form>
    </>
  )
}

LeadForm.schema = {
  name: 'editor.leadform.name',
  phoneNumber: 'editor.leadform.telephone',
  email: 'editor.leadform.email'
}

export default LeadForm