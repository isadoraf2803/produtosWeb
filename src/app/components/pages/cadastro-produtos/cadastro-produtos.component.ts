import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { endpoints } from '../../../configurations/environments';

@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {

  categorias: any[] = [];

  mensagem: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(endpoints.consultar_categorias)
      .subscribe({
        next: (data) => {

          this.categorias = data as any[];
        }
      }
      )
  }

  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)]
    ),
    preco: new FormControl('', [
      Validators.required, Validators.min(0.01)
    ]),
    quantidade: new FormControl('', [
      Validators.required, Validators.min(0)
    ]),
    categoriaId: new FormControl('', [
      Validators.required
    ]),
  });

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.http.post(endpoints.cadastar_produtos, this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          this.form.reset();
        }
      })

  }

}
