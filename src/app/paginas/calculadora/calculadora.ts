import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculadoraService } from '../../../services/calculadora.service';
import { Operacao } from '../../../models/operacoes.model';

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.css'],
})
export class Calculadora implements OnInit {
  calculadoraForm!: FormGroup;
  resultado: number | string = '';

  operacoes: Operacao[] = [];

  constructor(private calculadoraService: CalculadoraService) {}

  ngOnInit(): void {
    this.calculadoraForm = new FormGroup({
      primeiroNumero: new FormControl(null, [Validators.required, Validators.min(0)]),
      operacao: new FormControl('', [Validators.required]),
      segundoNumero: new FormControl(null, [Validators.required, Validators.min(0)]),
    });

    this.carregarOperacoes();
  }

  carregarOperacoes() {
    this.calculadoraService.getOperacoes().subscribe({
      next: (dados: Operacao[] | null) => {
        this.operacoes = dados ?? [];
        if (!this.operacoes || this.operacoes.length === 0) {
          this.operacoes = this.getDefaultOperacoes();
        }
        console.log('Operações carregadas do backend:', this.operacoes);
      },
      error: (erro: any) => {
        console.error('Erro ao carregar operações:', erro);
        this.resultado = 'Erro ao carregar operações da API.';
        this.operacoes = this.getDefaultOperacoes();
      },
    });
  }

  private getDefaultOperacoes(): Operacao[] {
    return [
      { nome: 'Adição', sigla: '+', valor: '+' },
      { nome: 'Subtração', sigla: '-', valor: '-' },
      { nome: 'Multiplicação', sigla: '*', valor: '*' },
      { nome: 'Divisão', sigla: '/', valor: '/' },
    ];
  }

  calcular() {
    if (this.calculadoraForm.invalid) {
      this.resultado = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const { primeiroNumero, operacao, segundoNumero } = this.calculadoraForm.value;

    const num1 = parseFloat(primeiroNumero);
    const num2 = parseFloat(segundoNumero);
    // chamar backend para realizar o cálculo
    this.calculadoraService.calcularBackend(num1, num2, operacao).subscribe({
      next: (resp: any) => {
        if (resp && typeof resp.resultado === 'number') {
          this.resultado = resp.resultado;
        } else if (resp && resp.mensagem) {
          this.resultado = resp.mensagem;
        } else {
          this.resultado = 'Resposta inesperada do servidor.';
        }
      },
      error: (err: any) => {
        console.error('Erro no cálculo no backend:', err);
        // extrair mensagem se existir
        const msg = err?.error?.mensagem || err?.message || 'Erro ao calcular no servidor.';
        this.resultado = msg;
      }
    });
  }
}
