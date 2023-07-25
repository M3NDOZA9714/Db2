export interface paquete {
    Id: number,
    Nombre: string,
    Descripcion: string
    Precio: number
}

export interface servicio {
    Id: number,
    IdPaquete: number,
    NombrePaquete: string,
    IdServicio: number,
    NombreServicio: string
    DescripcionServicio: string
}

export interface paqueteFilter {
    Nombre: string,
    Descripcion: string,
    Precio: string
}

export interface servicePackageFilter {
    NombreServicio: string,
    DescripcionServicio: string
}

export interface serviceFilter {
    Nombre: string,
    Descripcion: string
}
