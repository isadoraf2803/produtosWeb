import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule,
   Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { endpoints } from '../../configurations/environments';


@Component({
  selector: 'app-edicao-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {


    //atributos
    categorias: any[] = []; //array de objetos JSON
    mensagem: string = ''; //texto vazio
    produtoId: string = ''; //texto vazio
 
    //construtor
    constructor(
      private http: HttpClient, //requisições para a API
      private activated: ActivatedRoute //capturar variáveis na rota (URL)
    ) { }
 
    //função executada ao iniciar o componente
    ngOnInit() {


      //capturar o id do produto enviado pela URL
      this.produtoId = this.activated.snapshot.paramMap.get('id') as string;
      
      this.http.get(`${endpoints.obter_produto}/${this.produtoId}`)
      .subscribe({
        next: (data: any) => {
          this.form.controls.nome.setValue(data.nome);
          this.form.controls.preco.setValue(data.preco);
          this.form.controls.quantidade.setValue(data.quantidade);
          this.form.controls.categoriaId.setValue(data.categoria.id);
        }
      });
 
      //fazendo uma requisição GET para a API
      
      this.http.get(endpoints.consultar_categorias)
        .subscribe({ //aguardando o retorno da API
          next: (data) => { //capturando os dados obtidos
            //atribuindo os dados obtidos à variável categorias
            this.categorias = data as any[];
          }
        })
    }
 
    //declarando o formulário
    form = new FormGroup({
      nome : new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.maxLength(100)
      ]),
      preco : new FormControl('', [
        Validators.required, Validators.min(0.01)
      ]),
      quantidade : new FormControl('', [
        Validators.required, Validators.min(0)
      ]),
      categoriaId : new FormControl('', [
        Validators.required
      ])
    });
 
    //função auxiliar para verificar se cada foi preenchido corretamente
    get f() {
      return this.form.controls;
    }
 
    //função para capturar o evento SUBMIT do formulário
    onSubmit() {
      this.http.put(`${endpoints.atualizar_produtos}/${this.produtoId}`, this.form.value)
      .subscribe({
        next: (data: any) =>{
          this.mensagem = data.message
        }
      })
           
    }
}




