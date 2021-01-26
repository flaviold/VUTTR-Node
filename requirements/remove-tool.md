# **Remover Ferramenta**

> ## Camadas
### Main:
- ✅ Composição

### Validation:
- ✅ RemoveToolValidator

### Presentation:
- ✅ RemoveToolController

### Data:
- ✅ RemoveTool

### Infra:
- ✅ RemoveToolRepository

> ## Fluxo Padrão
1. ✅ Recebe uma requisição do tipo **DELETE** na rota **/api/tools/:id**
1. ✅ Valida se existe o campo **id**
1. ✅ Remove a ferramenta com o **id** fornecido
1. ✅ Retorna **204** após remover a ferramenta

> ## Exceções
1. ✅ Retorna **400** se algum campo não for fornecido
1. ✅ Retorna **500** na ocorrencia de um erro na remoção das ferramentas