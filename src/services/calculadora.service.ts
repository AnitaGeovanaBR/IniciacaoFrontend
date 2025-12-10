import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Operacao } from "../app/models/operacao";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private apiUrl = environment.api + '/calculadora/operacoes';
  private calcularUrl = environment.api + '/calculadora/calcular';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Operacao[]> {
    return this.http.get<Operacao[]>(this.apiUrl);
  }

  calcular(primeiroNumero: number, segundoNumero: number, operacao: string): Observable<any> {
    return this.http.post<any>(this.calcularUrl, {
      PrimeiroNumero: primeiroNumero,
      SegundoNumero: segundoNumero,
      Operacao: operacao
    });
  }
}
