import { useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Header(props) {
  useEffect(() => {}, []);

  const auth = getAuth();

  function criarConta(e) {
    e.preventDefault();
    let email = document.getElementById("email-cadastro").value;
    let username = document.getElementById("username-cadastro").value;
    let senha = document.getElementById("senha-cadastro").value;

    // Criar conta no Firebase
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        // Atualizar o nome de usuário
        updateProfile(user, {
          displayName: username
        })
          .then(() => {
            alert("Conta Criada com Sucesso");
            let modal = document.querySelector(".modalCriarConta");
            modal.style.display = "none";
          })
          .catch((error) => {
            alert("Erro ao atualizar o perfil: " + error.message);
          });
      })
      .catch((error) => {
        alert("Erro ao criar a conta: " + error.message);
      });
  }

  function logar(e) {
    e.preventDefault();
    let email = document.getElementById("email-login").value;
    let senha = document.getElementById("senha-login").value;

    // Login no Firebase
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        // Atualizar a prop `setUser` corretamente
        props.setUser(user.displayName);
        alert("Login realizado com sucesso! Bem-vindo, " + user.displayName);
      })
      .catch((error) => {
        alert("Erro ao fazer login: " + error.message);
      });
  }

  function abrirModalCriarConta(e) {
    e.preventDefault();
    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "block";
  }

  function fecharModalCriar() {
    let modal = document.querySelector(".modalCriarConta");

    modal.style.display = "none";
  }

  return (
    <div className="header">
      <div className="modalCriarConta">
        <div className="formCriarConta">
          <div onClick={() => fecharModalCriar()} className="close-modal-criar">
            X
          </div>
          <h2>Criar Conta</h2>
          <form onSubmit={(e) => criarConta(e)}>
            <input
              id="email-cadastro"
              type="text"
              placeholder="Seu e-mail...."
            />
            <input
              id="username-cadastro"
              type="text"
              placeholder="Seu username...."
            />
            <input
              id="senha-cadastro"
              type="password"
              placeholder="Sua Senha...."
            />
            <input type="submit" value="Criar Conta" />
          </form>
        </div>
      </div>
      <div className="center">
        <div className="header__logo">
          <a href="">
            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" />
          </a>
        </div>
        {props.user ? (
          <div className="header__logadoInfo">
            <span>
              Olá <b>{props.user}</b>
            </span>
            <a href="#">Postar!</a>
          </div>
        ) : (
          <div className="header__loginForm">
            <form onSubmit={(e) => logar(e)}>
              <input id="email-login" type="text" placeholder="Login...." />
              <input id="senha-login" type="password" placeholder="Senha...." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn__criarConta">
              <a onClick={(e) => abrirModalCriarConta(e)} href="#">
                Criar Conta!
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
