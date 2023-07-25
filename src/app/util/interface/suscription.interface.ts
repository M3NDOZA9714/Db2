export interface suscription {
    Id: number
    IdCliente: number,
    NombreCliente: string,
    IdPaquete: number,
    NombrePaquete: string,
    IdTecnico: number,
    NombreTecnico: string
    Horas: number
}

export interface suscriptionFilter {
    NombreCliente: string,
    NombrePaquete: string,
    NombreTecnico: string
    Horas: string
}
