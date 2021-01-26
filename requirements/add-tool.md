# **Adicionar Ferramenta**

> ## Camadas
### Main:
- ✅ Composição

### Validation:
- ✅ AddToolValidator

### Presentation:
- ✅ AddToolController

### Data:
- ✅ AddTool

### Infra:
- ✅ AddToolRepository


> ## Fluxo padrão
1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/tools**
1. ✅ Valida se existem os campos **title**, **link** e **description**
1. ✅ Cria uma ferramenta com os dados fornecidos
1. ✅ Retorna **201** com a ferramenta criada

> ## Exceções
1. ✅ Retorna **400** se algum campo não for fornecido
1. ✅ Retorna **500** na ocorrencia de um erro na criação da ferramenta