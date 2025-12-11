import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Operacao } from "../models/operacoes.model";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private calculadoraUrl = environment.api + "/api/calculadora";

  constructor(private httpCliente: HttpClient) {}

  getOperacoes(): Observable<Operacao[]> {
    return this.httpCliente.get<Operacao[]>(`${this.calculadoraUrl}/operacoes`);
  }

  calcularBackend(num1: number, num2: number, operacao: string): Observable<{resultado: number} | any> {
    const body = { num1, num2, operacao };
    const url = `${this.calculadoraUrl}/calcular`;
    console.log('[CalculadoraService] POST ->', url, 'body=', body);
    return this.httpCliente.post<{resultado: number}>(url, body);
  }
}
