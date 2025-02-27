import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { endpoints } from '../../../configurations/environments';
import { CommonModule } from '@angular/common';
import { Chart, ChartModule } from 'angular-highcharts';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


 grafico: Chart = new Chart();


 constructor(private http: HttpClient) {}


  ngOnInit() {
    this.http.get(endpoints.dashboard_quantidade_produtos)
      .subscribe({
        next: (data) => {
         
          const dados = data as any[];


          let conteudo: any[] = []; //array
          dados.forEach(item => {
            conteudo.push([ item.nomeCategoria, item.qtdProdutos ])
          });


          this.grafico = new Chart({
              chart: { type : 'pie' },
              title: { text : 'Quantidade de produtos por categoria.' },
              subtitle: { text: "Total de produtos separados por tipo de categoria." },
              plotOptions: {
                pie: {
                  innerSize: '50%',
                  dataLabels: { enabled: true }
                }
              },
              series: [ { data: conteudo, type: 'pie', name: 'Categorias' } ],
              legend: { enabled: false },
              credits: { enabled: false }
          });
        }
      })
  }
}




