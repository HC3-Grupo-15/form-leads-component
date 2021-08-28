import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useCssHandles } from 'vtex.css-handles'

interface LeadFormProps {}

const CSS_HANDLES = ['container', 'title', 'form', 'input', 'button', 'registered']

const LeadForm: StorefrontFunctionComponent<LeadFormProps> = ({ }) => {

  const api = axios.create({
    baseURL: "https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com"
  })

	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [telephone, setTelephone] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
			const response = await api.post("/leads", 
      {
        name: userName,
        email: userEmail,
        phoneNumber: telephone
			}
    )
    if (response) {
      setHasRegistered(true);
      setUserName("");
      setUserEmail("");
      setTelephone("");
    }
  };

  const handleRegister = () => {
		if (hasRegistered) {
			setHasRegistered(false);
			setUserName("");
      setUserEmail("");
      setTelephone("");
		}
	};

  const handles = useCssHandles(CSS_HANDLES)

  return (

    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      {!hasRegistered ? (
        <>
        <div className={`${handles.title} db tc`}> Receba promoções! </div>
        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input type="text" value={userName} onChange={(event) => setUserName(event.target.value)} required placeholder="Digite seu nome" />
          <label>Email</label>
          <input type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} required placeholder="Digite seu e-mail" />
          <label>Telefone</label>
          <input type="tel" value={telephone} onChange={(event) => setTelephone(event.target.value)} required placeholder="Digite seu telefone" />
          <button type="submit" onClick={() => {handleRegister}} >Enviar</button>
        </form>
        </>
      ) : (
      <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
						<h3>Seu e-mail foi cadastrado com sucesso!</h3>
						<p>
							A partir de agora você receberá as novidades e ofertas exclusivas.
						</p>
						<button type="button" onClick={handleRegister}>
							Cadastrar novo e-mail
						</button>
					</div>
				)}
    </div>
  )
}


LeadForm.schema = {
  title: "editor.lead-form.title",
    description: "editor.lead-form.description",
    type: "object",
    properties: {},
}

export default LeadForm