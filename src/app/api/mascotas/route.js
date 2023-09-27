import { NextResponse } from "next/server";

export async function GET() {

    const data = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9')
    const mascotas = await data.json()

    const ShuffleCartas = () => {
        const cartas = []
        mascotas['entries'].map(element => cartas.push({
            src:element.fields['image'].url,  
            matched:false,
            id:element.fields['image'].uuid
        })); 
        const spreadCartas = [...cartas, ...cartas]
          .sort(()=>Math.random()-0.5 )
   
        return spreadCartas
    }

    return NextResponse.json({
      data:ShuffleCartas()
    })
  
  }