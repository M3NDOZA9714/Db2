export interface service {
    Id: number,
    Nombre: string,
    Descripcion: string,
    Precio: number
}

export interface serviceFilter {
    Nombre: string,
    Descripcion: string,
    Precio: string
}