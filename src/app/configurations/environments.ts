const apiUrl = "http://localhost:8081"

export const endpoints = {
    cadastar_produtos : `${apiUrl}/api/produtos/cadastrar`,
    atualizar_produtos : `${apiUrl}/api/produtos/atualizar`,
    excluir_produtos : `${apiUrl}/api/produtos/excluir`,	
    consultar_produtos : `${apiUrl}/api/produtos/consultar`,	
    obter_produto : `${apiUrl}/api/produtos/obter`,
    consultar_categorias : `${apiUrl}/api/categorias/consultar`,	
    dashboard_quantidade_produtos: `${apiUrl}/api/dashboard/quantidade-produtos-categoria`

};