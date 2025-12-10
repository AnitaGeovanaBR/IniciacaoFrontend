import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Operacao } from "../models/operacao.model";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
    private calculadoraUrl = environment.api + "/calculadora";

    constructor(private httpCliente: HttpClient) {}
    
    getOperacoes(): Observable<Operacao[]> {
        return this.httpCliente.get<Operacao[]>(`${this.calculadoraUrl}/operacoes`);
    }
}