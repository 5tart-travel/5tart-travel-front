import { IAgencias } from "@/interface/IAgencias";

export async function getAgenciaDB() { 
    try {
        const res= await fetch ("https://huellasdesperanza.onrender.com/shelters", {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache" 
            }
        })
        const agencia: IAgencias[] = await res.json()
        return agencia
    } catch (error:any) {
        throw new Error(error)
    }
}

export async function getAgencia() {
    try {
        const agenciaDB = await getAgenciaDB()
        return agenciaDB
    } catch (error : any) {
        throw new Error (error)
    }
}

export async function getAgenciaById(id:string) {
    try {
        const agencias = await getAgencia()
        const agencia = agencias.find((agencia) => agencia.id!.toString() === id)
            return agencia
    } catch (error: any) {
        
    }
}

