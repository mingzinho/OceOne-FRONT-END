Endpoints Utilizados
    1 -Criar Usuário
    2- Navegar para outra tela
    3 - Adicionar Marcador
    4 - Carregar Marcadores
    5 - Mover Marcador
    6 - Resetar Marcadores
    7 - Login de usuário
    8 - Enviar Email para Resetar Senha

1 - Criar Usuário
Descrição: Cria um novo usuário no Firebase Authentication utilizando email e senha.

Endpoint:

Método: POST
URL: https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] (Esse é o endpoint subjacente do Firebase Auth)
Dados enviados

Sucesso: Usuário criado e armazenado no firebase
Falha: Erro indicando falta de informações 

2 - Navegar para outra tela
Descrição: Navega para a tela do mapa após a criação do usuário. Esta função utiliza a navegação do React Navigation para mover o usuário para uma nova tela.

Navegação para a tela.

3  - Adicionar Marcador
Descrição: Adiciona um novo marcador no Firestore com a coordenada e a informação fornecida pelo usuário.

Endpoint:

Método: POST
URL: firebase.firestore().collection('markers')

Retorno:

Sucesso: Confirmação da adição do documento no Firestore.
Falha: Erro indicando o problema ocorrido durante a adição do documento.


4 = Carregar Marcadores
Descrição: Carrega todos os marcadores armazenados no Firestore.

Endpoint:

Método: GET
URL: firebase.firestore().collection('markers')
Exemplo de Requisição:

Sucesso: Lista de documentos com os dados dos marcadores.
Falha: Erro indicando o problema ocorrido durante a recuperação dos documentos.

5 - Descrição: Move um marcador específico para uma nova localização ajustada.

Endpoint:

Método: Não se aplica diretamente a um endpoint, pois é manipulado no estado local do componente React.
Exemplo de Requisição:

Atualiza o estado dos marcadores no componente React, sem persistir no Firestore.

6 - Descrição: Reseta a posição dos marcadores para suas localizações originais.

Endpoint:

Método: Não se aplica diretamente a um endpoint, pois é manipulado no estado local do componente React.
Exemplo de Requisição:

Atualiza o estado dos marcadores no componente React, sem persistir no Firestore.

7 - Descrição: Autentica um usuário com email e senha no Firebase Authentication.

Endpoint:

Método: POST
URL: https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] (Esse é o endpoint subjacente do Firebase Auth)
Dados enviados:

8 - Enviar Email para Resetar Senha
Descrição: Envia um email de redefinição de senha para o endereço de email fornecido.

Endpoint:

Método: POST
URL: https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=[API_KEY] (Esse é o endpoint subjacente do Firebase Auth)
Dados enviados:
