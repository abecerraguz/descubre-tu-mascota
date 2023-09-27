"use client";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Image from 'next/image'
import iconMascota from "../../../public/cover.svg"
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
                <Image 
                    src={card.src}
                    className="object-cover h-48 w-96 front"
                    width={96}
                    height={48}
                    alt="card front"
                />
                <Image className='object-cover h-48 w-96 back'
                        src={iconMascota}
                        onClick={handleClick}
                        alt="Fallback" />
                </div>
            </article>
     
    )
}
export default Card