export interface invoice {
    Id: number,
    Fecha: Date,
    IdCliente: number,
    NombreCliente: string,
    Estado: string,
    Subtotal: number,
    Impuesto: number,
    Total: number
}

export interface invoiceFilters {
    Fecha: string,
    NombreCliente: string,
    Estado: string,
    Subtotal: string,
    Impuesto: string,
    Total: string
}

export interface invoiceDetail {
    Id: number,
    Nombre: string,
    tipo: string,
    Cantidad: number,
    Precio: number,
    Impuesto: number
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