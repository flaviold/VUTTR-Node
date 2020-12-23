# **Listar Ferramentas**

> ## Fluxo padrão
1. ⛔ Recebe uma requisição do tipo **GET** na rota **/api/tools**
1. ⛔ Caso tenha **tag** nos parâmetros de **Query** filtra pelas tags passadas
1. ✅ Retorna **204** caso nenhuma ferramenta seja encontrada
1. ✅ Retorna **200** com a lista de ferramentas

> ## Exceções
1. ✅ Retorna 500 na ocorrencia de um erro na busca das ferramentas