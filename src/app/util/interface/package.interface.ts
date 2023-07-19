export interface paquete {
    Id: number,
    Nombre: string,
    Descripcion: string
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
    Descripcion: string
}

export interface servicePackageFilter {
    NombreServicio: string,
    DescripcionServicio: string
}
