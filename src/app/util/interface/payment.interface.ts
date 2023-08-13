export interface payment {
    IdPago: number,
    Fecha: string,
    Factura: string,
    IdBanco: number,
    NombreBanco: string,
    CuentaBanco: string,
    Monto: number,
    Tipo: string
}

export interface paymentFilter {
    Fecha: string,
    Factura: string,
    NombreBanco: string,
    CuentaBanco: string,
    Monto: string,
    Tipo: string
}
