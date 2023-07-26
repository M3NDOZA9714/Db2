export interface invoice {
    Id: number,
    Fecha: string,
    IdCliente: number,
    NombreCliente: string,
    Estado: string,
    Tipo: string,
    Subtotal: number,
    Impuesto: number,
    Total: number
}

export interface invoiceFilters {
    Fecha: string,
    NombreCliente: string,
    Estado: string,
    Tipo: string,
    Subtotal: string,
    Impuesto: string,
    Total: string
}

export interface invoiceDetail {
    Id: number,
    IdArticulo: number,
    Nombre: string,
    Tipo: string,
    Cantidad: number,
    Precio: number,
    Impuesto: number
}

export interface invoiceDetailFilters {
    Nombre: string,
    Tipo: string,
    Cantidad: string,
    Precio: string,
    Impuesto: string
}

export interface servicioFactura {
    Id: number,
    Nombre: string,
    Tipo: string,
    Precio: number
}

export interface servicioFacturaFilters {
    Nombre: string,
    Tipo: string,
    Precio: string
}