import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useCssHandles } from 'vtex.css-handles';

interface LeadFormProps {}

const CSS_HANDLES = ['container', 'title', 'form', 'input', 'button', 'registered', 'wrapper', 'ContainerInput', 'label', 'button', 'buttonSubmit', 'paragraph', 'message'] as const

const LeadForm: StorefrontFunctionComponent<LeadFormProps> = ({ }) => {

  const api = axios.create({
    //baseURL: "https://cbrdqaqq92.execute-api.sa-east-1.amazonaws.com"
    baseURL: "https://juliabrz--hiringcoders202115.myvtex.com"
  })

	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [telephone, setTelephone] = useState("");
  const [hasRegistered, setHasRegistered] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
      console.log(telephone)
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

    <div className={`${handles.container}`}>
      <div className={`${handles.wrapper}`}>
        {!hasRegistered ? (
          <>
            <div className={`${handles.title}`}> Receba promoções! </div>
            <form className={`${handles.form}`} onSubmit={handleSubmit}>

              <div className={`${handles.ContainerInput}`}>
                <label className={`${handles.label}`}>
                  Nome:
                  <input className={`${handles.input}`} type="text" value={userName} onChange={(event) => setUserName(event.target.value)} required placeholder="Digite seu nome" />
                </label>
              </div>

              <div className={`${handles.ContainerInput}`}>
                <label className={`${handles.label}`}>
                  Email:
                  <input className={`${handles.input}`} type="email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} required placeholder="Digite seu e-mail" />
                </label>
              </div>

              <div className={`${handles.ContainerInput}`}>
                <label className={`${handles.label}`}>
                  Telefone:
                  <input className={`${handles.input}`} type="tel" value={telephone} onChange={(event) => setTelephone(event.target.value)} required placeholder="Digite seu telefone" />
                </label>
              </div>

              <div className={`${handles.ContainerInput}`}>
                <button className={`${handles.buttonSubmit}`} type="submit" onClick={() => {handleRegister}} >Enviar</button>
              </div>
            </form>
          </>
        ) : (
        <div className={`${handles.registered}`}>
              <div className={`${handles.massage}`}>Seu e-mail foi cadastrado com sucesso!</div >
              <p className={`${handles.paragraph}`}>
                A partir de agora você receberá as novidades e ofertas exclusivas.
              </p>
              <button className={`${handles.button}`} type="button" onClick={handleRegister}>
                Cadastrar novo e-mail
              </button>
            </div>
          )}
        </div>
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