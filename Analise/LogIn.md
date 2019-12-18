# Inicio de sessão

- Como cliente quero fazer login para fazer e ver as minhas encomendas. 

## Análise

- É solicitado um novo login por um utilizador;
- É pedido ao utlilizador para fornecer os dados de acesso (email e password);
- O utilizador fornece os dados pedidos;
- É permitido ou negado o acesso deste utilizador a sua conta, caso:
    - Utilizador nao está previamente registado no site;
    - Email ou password estiverem erradas.
- Em caso afirmativo, é dado um token individual para o utilizador se autentificar nas suas operações.

- Nota: o módulo de gestão de encomendas e é que vai fornecer a informação relativa a validade das credenciais de login.

