# **Adicionar Ferramenta**

> ## Camadas
1. ⛔ Composição
1. ⛔ AddToolValidator
1. ✅ AddToolController
1. ✅ AddTool
1. ⛔ AddToolRepository

> ## Fluxo padrão
1. ⛔ Recebe uma requisição do tipo **POST** na rota **/api/tools**
1. ⛔ Valida se existe os campos **title**, **link** e **description**
1. ⛔ Cria uma ferramenta com os dados fornecidos
1. ✅ Retorna **201** com a ferramenta criada

> ## Exceções
1. ✅ Retorna 400 se algum campo não for fornecido
1. ✅ Retorna 500 na ocorrencia de um erro na busca das ferramentas