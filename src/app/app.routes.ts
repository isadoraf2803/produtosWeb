import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { EdicaoProdutosComponent } from './components/edicao-produtos/edicao-produtos.component';
import { ConsultarProdutosComponent } from './components/consultar-produtos/consultar-produtos.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'pages/cadastro-produtos',
        component: CadastroProdutosComponent
        
    },
    {
        path: 'pages/consulta-produtos',
        component: ConsultarProdutosComponent
    },
    {
        path: 'pages/edicao-produtos/:id',
        component: EdicaoProdutosComponent
    },
    {
        path: 'pages/dashboard',
        component: DashboardComponent

    },
    {
        path: '', pathMatch: 'full',
        redirectTo: '/pages/dashboard'
    }
];
