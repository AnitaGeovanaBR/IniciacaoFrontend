export interface Operacao {
    nome: string; 
    sigla: string;
    valor: string;
}

export interface CalculoRequest {
    primeiroNumero: number;
    segundoNumero: number;
    operacao: string;
}

export interface CalculoResponse {
    resultado: number;
}
