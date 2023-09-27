"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Card({ card, handleOption, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleOption(card)
        }
    }

    useEffect(() => {
        if (flipped) {
            const cardFlippedImage = document.querySelectorAll('.flipped')
                if(cardFlippedImage.length === 18){
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Felicitaciones, ganaste!',
                        showConfirmButton: false,
                        timer: 5000
                      })
                }
  
        }
    }, [flipped])
  
    return (
     
            <article className="bg-slate-800 hover:bg-slate-900 hover:cursor-pointer card">
                <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="object-cover h-48 w-96 front"/>
                <img className='object-cover h-48 w-96 back'
                        src="/cover.svg"
                        onClick={handleClick}
                        alt="card back" />
                </div>
            </article>
     
    )
}
export default Card