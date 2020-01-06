# Padrões

## SOLID

### S - Single Responsability Principle (Principio da Responsabilidade Única)

- Indica que cada class/módulo deve ter apenas uma única responsabilidade sobre uma única parte da funcionalidade fornecida pelo software.

    - Exemplo: Cada módulo (MDF, MDP, GE e PP) tem apenas atribuido uma só responsabilidade.

### O — Open/closed principle

- Afirma que as entidades de software (classes, módulos, funções, etc.) devem estar abertas para extensões, mas fechadas para modificação.

    - Exemplo: A funcionalidade de ativar/desativar máquina foi uma das funcionalidade que extendeu a classe Máquina, na medida em que esta necessitou de uma variável que antes não tinha (o estado), cuja adição que não modificou o que foi feito até então.

### L — Liskov substitution principle

- Afirma que, se S é um subtipo de T, objetos do tipo T podem ser substituídos por objetos do tipo S.

### I — Interface segregation principle

- Afirma que nenhum cliente não deve ser forçado a depender dos métodos que não usa. Simplificando: não se adiciona novas funcionalidades a uma interface existente adicionando novos métodos. Em vez disso, cria-se uma nova interface em que a classe possa implementar várias interfaces, se necessário.

### D - Dependency inversion principle

- Afirma que os módulos de alto nível não devem depender dos módulos de baixo nível, ambos devem depender de abstrações. Abstrações não devem depender de detalhes, os detalhes devem depender de abstrações.

    - Exemplo: Foram instanciadas as listas como List e nunca como as suas instancia 'inferiores', para que, se fosse modificado o tipo de lista a ser utilizado não se modificasse também a classe (Open/Closed principle violado).

## GRASP

### Controller

- O padrão controller atribui a responsabilidade de manipular eventos do sistema para uma classe que não seja de interface do utilizador.

    - Exemplo: Foi usado o padrão controller para classes cuja responsabilidade era tratar de pedidos HTTP e respostas.

### Creator

- O padrão creator define quais as classes que tem a responsabilidade de criação de outras.

### Alta coesão

- Significa que as responsabilidades de um determinado elemento estão fortemente relacionadas e altamente focadas.

    - Exemplo: Divisão do sistema em vários módulos.

### Baixo acoplamento

- Força pela qual um elemento está conectado a outros, ou depende deles. Baixo quando existe menor dependência entre classes, alteração de uma classe tem menor impacto nas outras, maior reutilização.

    - Exemplo: Não utilização do padrão extends para os controllers e services.
