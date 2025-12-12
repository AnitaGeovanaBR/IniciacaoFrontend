import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Operacao, CalculoRequest, CalculoResponse } from "../models/operacao.model";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
    private calculadoraUrl = environment.api + "/calculadora";

    constructor(private httpCliente: HttpClient) {}
    
    getOperacoes(): Observable<Operacao[]> {
        return this.httpCliente.get<Operacao[]>(`${this.calculadoraUrl}/operacoes`);
    }

    calcular(request: CalculoRequest): Observable<CalculoResponse> {
        return this.httpCliente.post<CalculoResponse>(`${this.calculadoraUrl}/calcular`, request);
    }

}