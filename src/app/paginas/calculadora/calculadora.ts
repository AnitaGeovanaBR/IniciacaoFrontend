import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  expressao: string = '';
  erro: string | null = null;
  mostrarModal: boolean = false;

  constructor(private fb: FormBuilder, private calcService: CalculadoraService, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      primeiroNumero: ['', [Validators.required, this.numeroValidator]],
      operacao: ['', [Validators.required]],
      segundoNumero: ['', [Validators.required, this.numeroValidator]]
    });
  }

  numeroValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const isNumber = !isNaN(parseFloat(value)) && isFinite(value);
    return isNumber ? null : { naoENumero: true };
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
      this.mostrarModal = false;
      this.calcService.calcular(Number(val.primeiroNumero), Number(val.segundoNumero), val.operacao)
        .subscribe({
          next: (res) => {
            this.resultado = res.resultado;
            this.expressao = `${val.primeiroNumero} ${val.operacao} ${val.segundoNumero} = ${res.resultado}`;
            this.cdr.detectChanges();
          },
          error: (err) => {
            this.erro = 'Ocorreu um erro, tente novamente ou mais tarde.';
            this.mostrarModal = true;
            this.resultado = null;
            this.expressao = '';
            this.cdr.detectChanges();
          }
        });
    } else {
      this.erro = 'Preencha todos os campos';
      this.mostrarModal = true;
    }
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

}
