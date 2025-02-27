import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../configurations/environments';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink


  ],
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css'
})
export class ConsultarProdutosComponent {

  produtos: any[] = [];
  mensagem: string = '';

  constructor(private http: HttpClient) { }

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get f() {
    return this.form.controls;
  }

  onsubmit() {
    this.http.get(`${endpoints.consultar_produtos}/${this.form.value.nome}`)
      .subscribe({
        next: (data) => {
          this.produtos = data as any[];
          this.mensagem = `Quantidade de registros encontrados: ${this.produtos.length}`;
        }
      })


  }

  onDelete(id: string) {
    if (confirm('Deseja realmente o produto selecionado?')) {

      this.http.delete(`${endpoints.excluir_produtos}/${id}`)
        .subscribe({
          next: (data: any) => {
            this.mensagem = data.message;
            this.produtos = this.produtos.filter(produtos => produtos.id !== id);
          }
        })
    }
  }
}
