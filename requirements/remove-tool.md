# **Remover Ferramenta**

> ## Camadas
1. ⛔ Composição
1. ⛔ RemoveToolValidator
1. ⛔ RemoveToolController
1. ⛔ RemoveTool
1. ⛔ RemoveToolRepository

> ## Fluxo Padrão
1. ⛔ Recebe uma requisição do tipo **DELETE** na rota **/api/tools**
1. ⛔ Valida se existe o campo **id**
1. ⛔ Remove a ferramenta com o **id** fornecido
1. ⛔ Retorna **204** após remover a ferramenta

> ## Exceções
1. ⛔ Retorna **400** se algum campo não for fornecido
1. ⛔ Retorna **500** na ocorrencia de um erro na busca das ferramentas