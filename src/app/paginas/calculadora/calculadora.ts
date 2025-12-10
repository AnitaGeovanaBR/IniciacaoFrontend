import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculadoraService } from '../../../services/calculadora.service';
import { Operacao } from '../../models/operacao';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora implements OnInit {
  form: FormGroup;
  operacoes: Operacao[] = [];
  resultado: number | string | null = null;
  erro: string | null = null;

  constructor(private fb: FormBuilder, private calcService: CalculadoraService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      primeiroNumero: ['', [Validators.required]],
      operacao: ['', [Validators.required]],
      segundoNumero: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.calcService.getAll().subscribe({
      next: (ops) => {
        this.operacoes = ops;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar operações do backend';
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const val = this.form.value;
      this.erro = null;
      this.calcService.calcular(Number(val.primeiroNumero), Number(val.segundoNumero), val.operacao)
        .subscribe({
          next: (res) => {
            this.resultado = res.resultado;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.erro = err?.error || 'Erro ao calcular';
            this.resultado = null;
            this.cdr.detectChanges();
          }
        });
    } else {
      this.erro = 'Preencha todos os campos';
    }
  }

}
