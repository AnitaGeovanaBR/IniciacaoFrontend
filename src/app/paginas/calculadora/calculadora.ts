import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculadoraService } from '../../../services/calculadora.service'; 
import { Operacao, CalculoRequest } from '../../../models/operacao.model'; 
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-calculadora',
  standalone: false,
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora implements OnInit {
  calculadoraForm!: FormGroup; 
  resultado: number | string = 'Aguardando cálculo...';
  
  operacoes$!: Observable<Operacao[]>; 

  operacoes: Operacao[] = []; 

  mostarModalErro: boolean = false;
  mensagemErro: string = '';

  campoAtivo: 'primeiro' | 'segundo' = 'primeiro';

  constructor(private calculadoraService: CalculadoraService) { } 

  ngOnInit(): void {
    this.calculadoraForm = new FormGroup({
 
      primeiroNumero: new FormControl(null, [
        Validators.required,
      ]),
      operacao: new FormControl('', [
        Validators.required 
      ]),
      segundoNumero: new FormControl(null, [
        Validators.required,
      ])
    });
    
    this.carregarOperacoes();
  }

  setCampoAtivo(campo: 'primeiro' | 'segundo'): void {
    this.campoAtivo = campo;
  }
handleKeypadInput(value: string): void {
    const controlName = this.campoAtivo === 'primeiro' ? 'primeiroNumero' : 'segundoNumero';
    const control = this.calculadoraForm.get(controlName);
    if (!control) return;

    let currentValue = (control.value || '').toString();

    if (value === 'C') {
        control.setValue(null);
        return;
    }
        if (value === 'DEL') {
        if (currentValue && currentValue !== 'null') {
            currentValue = currentValue.slice(0, -1);
            control.setValue(currentValue === '' ? null : currentValue);
        }
        return; 
    }
    if (value === '.') {
        if (!currentValue.includes('.')) {
            currentValue = (currentValue === 'null' || currentValue === '') ? '0.' : currentValue + '.';
            control.setValue(currentValue);
        }
        return;
    } 
    
    if (currentValue === 'null' || currentValue === '') {
        currentValue = value; 
    } else {
        currentValue += value;
    }
    
    control.setValue(currentValue);
}

  selectOperationKeypad(op: string): void {
      this.calculadoraForm.get('operacao')?.setValue(op);
      this.setCampoAtivo('segundo'); 
  }

  fecharModal(){
    this.mostarModalErro = false;
    this.mensagemErro = '';
  }
  
  
  carregarOperacoes() { 
          this.operacoes$ = this.calculadoraService.getOperacoes();
          this.operacoes$.subscribe({
          next: (dados: Operacao[]) => {
              this.operacoes = dados;
              console.log('Operações carregadas do backend:', this.operacoes);
          },
          error: (erro) => {
              console.error('Erro ao carregar operações:', erro);
              this.mensagemErro = 'Ocorreu um erro ao carregar as operações, tente novamente ou mais tarde.';
              this.mostarModalErro= true;
              this.resultado = 'Erro ao carregar operações.';
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

    const request: CalculoRequest ={
        primeiroNumero: num1,
        operacao: operacao,
        segundoNumero: num2
    };

    this.calculadoraService.calcular(request).subscribe({
        next: (response) => {
            const opSimbolo = this.operacoes.find(op => op.valor === operacao)?.valor || operacao;
            this.resultado = ` (${num1} ${opSimbolo} ${num2} = ${response.resultado})`;
    },
        error: (erro) => {
            console.error('Erro no cálculo:', erro);
            if (erro.status === 400 && erro.error && erro.error.message) {
                this.mensagemErro = erro.error.message;
            } else {
                this.mensagemErro = 'Ocorreu um erro, tente novamente ou mais tarde.';
            }
            this.mostarModalErro = true;
            this.resultado = 'Erro no cálculo.';
          }
    });
  }   
}