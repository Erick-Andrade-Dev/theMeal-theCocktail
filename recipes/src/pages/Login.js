import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Login.css'

function validateEmail(email) {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function onClickStorage(email) {
  if(!localStorage.getItem('mealsToken')) localStorage.setItem('mealsToken', '1')
  if(!localStorage.getItem('cocktailsToken')) localStorage.setItem('cocktailsToken', '1')
  if(!localStorage.getItem('user')) localStorage.setItem('user', JSON.stringify({ email }))
}

export default function Login(props) {
  const [validation, setValidation] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(validateEmail(email) && password.length > 6) {
      setValidation(false)
    } else {
      setValidation(true)
    }
  }, [email, password])

  const enterEvent = (e) => {
    let key = e.which || e.keyCode;
    if (key === 13 && !validation) {
      onClickStorage(email);
      return props.history.push("/comidas")     
    }
  };

  return (
    <form className="form-login">
      <div className="container-inputs">
        <h1 className="title-login">Login</h1>
        <input 
          className="input-login"
          type="email"
          placeholder="Digite seu e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />        
         <input 
          className="input-login"
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => enterEvent(e)}
        />
        <Link to="/comidas">
          <button
            className="btn-login"
            type="button"
            onClick={() => onClickStorage(email)}
            disabled={ validation }
          >
            Entrar
          </button>
        </Link>
      </div>
    </form>
  )
}