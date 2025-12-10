import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculadoraService } from '../../../services/calculadora.service'; 
import { Operacao } from '../../../models/operacao.model'; 

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora implements OnInit {
  calculadoraForm!: FormGroup; 
  resultado: number | string = 'Aguardando cálculo...';
  
  operacoes: Operacao[] = []; 

  constructor(private calculadoraService: CalculadoraService) { } 

  ngOnInit(): void {
    this.calculadoraForm = new FormGroup({
 
      primeiroNumero: new FormControl(null, [
        Validators.required,
        Validators.min(0) 
      ]),
      operacao: new FormControl('', [
        Validators.required 
      ]),
      segundoNumero: new FormControl(null, [
        Validators.required,
        Validators.min(0) 
      ])
    });
    
    this.carregarOperacoes();
  }
  carregarOperacoes() { 
      this.calculadoraService.getOperacoes().subscribe({
          next: (dados: Operacao[]) => {
              this.operacoes = dados;
              console.log('Operações carregadas do backend:', this.operacoes);
          },
          error: (erro) => {
              console.error('Erro ao carregar operações:', erro);
              this.resultado = 'Erro ao carregar operações da API.';
          }
      });
  }


  calcular() {

    if (this.calculadoraForm.invalid) {
      this.resultado = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const { primeiroNumero, operacao, segundoNumero } = this.calculadoraForm.value;
    
    const num1 = parseFloat(primeiroNumero);
    const num2 = parseFloat(segundoNumero);

    let res: number;

    switch (operacao) { 
      case '+': 
        res = num1 + num2;
        break;
      case '-': 
        res = num1 - num2;
        break;
      case '*': 
        res = num1 * num2;
        break;
      case '/': 
        if (num2 === 0) {
          this.resultado = 'Erro: Divisão por zero não é permitida.';
          return;
        }
        res = num1 / num2;
        break;
      default:
        this.resultado = 'Operação inválida.';
        return;
    }

    this.resultado = res;
  }
}