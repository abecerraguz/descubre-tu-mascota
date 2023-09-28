import { NextResponse } from "next/server";

export async function GET() {

  try {
    const data = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9')
    const mascotas = await data.json()
    const cartas = []

    mascotas['entries'].map(element => cartas.push({
      src: element.fields['image'].url,
      matched: false,
      id: element.fields['image'].uuid
    }));
    const spreadCartas = [...cartas, ...cartas]
      return NextResponse.json({data: spreadCartas})
  } catch (error){
      return NextResponse.json({data: error})
  }
}