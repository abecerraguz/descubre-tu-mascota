"use client"
import { useState, useEffect } from "react";
import Card from "@/app/components/Card";
import Swal from 'sweetalert2'
import Image from 'next/image'
import iconMascota from "../../public/casa-de-mascotas.png"

function Page() {

  const [cards, setCards] = useState([]);
  const [user, setUser] = useState(null);
  const [turns, setTurns] = useState(0);
  const [optionOne, setOptionOne] = useState(null);
  const [optionTwo, setOptionTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    addClass()
  }, []);

  const addClass = () => {
    const formInitGame = document.querySelector('.formInitGame')
    formInitGame.classList.add('slide-down')
  }

  const initGame = (e) => {
    e.preventDefault()
    const userName = document.querySelector('#username').value

    if (userName === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un nombre de usuario!',
      })
      return
    } else {

      fetch('/api/mascotas')
        .then((res) => res.json())
        .then((data) => {
          const cards = data.data
          setCards(cards)
        })

      setOptionOne(null)
      setOptionTwo(null)
      setTurns(0)
      setUser(userName)
      const removeformInitGame = document.querySelector('.formInitGame'),
        showGame = document.querySelector('.gameHidden')
      removeformInitGame.classList.remove('slide-down')
      showGame.classList.add('gameShow')
      localStorage.setItem("userName", userName);

    }

  }


  const handleOption = (card) => {
    optionOne ? setOptionTwo(card) : setOptionOne(card)
  }

  useEffect(() => {
    if (optionOne && optionTwo) {
      setDisabled(true)
      if (optionOne.src === optionTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === optionOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [optionOne, optionTwo]);

  const resetTurn = () => {
    setOptionOne(null)
    setOptionTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  const resetGame = () => {
    // var cat = localStorage.getItem(userName);
    setCards([])
    setOptionOne(null)
    setOptionTwo(null)
    setTurns(0)
    setUser(localStorage.getItem('userName'))
    setDisabled(false)

    fetch('/api/mascotas')
      .then((res) => res.json())
      .then((data) => {
        const cards = data.data
        setCards(cards)
      })
  }

  return (
    <div className='container m-auto my-5 lg:w-1/2 md:w-full px-3 md:px-10'>
      <form className="formInitGame" onSubmit={initGame}>
        <div className="flex flex-wrap">
          <div className="w-full px-3">
            <h2 className="font-bold tracking-wide uppercase border-b border-light-blue-500 border-opacity-50 mb-3 text-sky-500 text-center flex flex-col justify-center items-center text-xl"><span className="titleGame__img"><Image className="titleGame__img-img" src={iconMascota} alt="Icono Mascota" /></span><span>Bienvenido a Descubre tu mascota!</span></h2>
            <label className="block uppercase tracking-wide text-sky-400 text-xs font-bold mb-2" for="grid-password">
              Nombre
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Ingresa tu nombre" />
            <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded my-5 block text-center w-full">New Game</button>
          </div>
        </div>
      </form>
      <div className="gameHidden">

        <h1 className="text-2xl font-bold tracking-wide uppercase border-b border-gray-500 mb-3 titleGame"><span className="titleGame__img"><Image  className="titleGame__img-img" src={iconMascota} alt="Icono Mascota"/></span> <span>DESCUBRE TU MASCOTA!</span></h1>
        <p className="p-5 bg-sky-600 rounded my-5 text-center flex justify-between"><span>Bienvenido!! : {user}</span>    <span>Puntaje : {turns}</span></p>

        <section className='gap-3 grid md:grid-cols-6 grid-cols-1'>

          {cards.map(element => (

            <Card
              key={element.id}
              card={element}
              handleOption={handleOption}
              flipped={element == optionOne || element === optionTwo || element.matched}
              disabled={disabled}
            />

          ))}
        </section>
        <div className="flex justify-center gap-3">
          <button onClick={resetGame} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-blue-600 text-white font-bold py-2 px-4 rounded my-5 text-center">Reset Game</button>
        </div>

      </div>

    </div>
  )
}

export default Page