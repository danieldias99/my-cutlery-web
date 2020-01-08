# Visualização do Planeamento de Produção

- Como adminstrador quero poder visualizar a animação dos produtos encomendados.

## Análise

### Sequência

- O administrador solicita a vizualização do plano de produção.
- O plano de produção gerado é demonstrado e animado.
    - Geração do plano de produção é da responsabilidade do módulo PP
    - O módulo de visualização vai consumir o MDF para demosntrar os equipamentos e o MDP para demonstrar os produtos.

### Formato de request do plano de produção ao módulo PP

```
/exportar
```

### Formato de response do plano de produção ao módulo PP

```
{
    agenda: [
        tarefa: {
            linha: "1",
            maquina: "1",
            operacao: 1,
            ferramenta: "Furadora Mecânica",
            produto: "Colher",
            tempo_execucao: 10,
            tempo_setup: 5
        },
        tarefa: {
            linha: "1",
            maquina: "1",
            operacao: 2,
            ferramenta: "Furadora Laiser",
            produto: "Colher",
            tempo_execucao: 5,
            tempo_setup: 5
        }
    ]
]
```
## Animação do chão de fábrica com o PP

- Máquinas
    - Timeout para a troca de ferramenta se necessário.
    - Animação das ferramentas como dois estados (maquina não animada e animada), e troca entre eles pelo periodo do tempo de execução.
    - Tooltip para a demonstração da informação relativa aquela Máquina (Info BD).

- Tapete Rolante/Linhas de Produção
    - Animação constante da textura do tapete para demosntrar a direção do fabrico do produto.
    - Tooltip para a demonstração da informação relativa aquela Linha de Produção (Info BD).

- Produto
    - Representado por um cubo que vai trocando a sua posição durante a linha de produção mediante o tempo de execução.
    - Tooltip para identificar a operação que está a ser feita naquele instante.

- Storage
    - Representado por uma caixa sem tampa.
    - Tooltip para identificar os produtos e as quantidades dos mesmos já concluidos.