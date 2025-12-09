import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FrutasService {
    private frutas = environment.api + "/frutas";

    constructor(private httpCliente: HttpClient) {}

    getAll(): Observable<any> {
        return this.httpCliente.get<any>(
            this.frutas + '/todas'
        );
    }
}