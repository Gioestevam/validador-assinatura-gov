# Validador de Assinatura PDF com Puppeteer e Express

Este projeto implementa um serviço simples em Node.js usando `Express`, `Puppeteer` e `express-fileupload` para validar a assinatura digital de um arquivo PDF em um site externo. O servidor recebe um arquivo PDF via requisição `POST` e usa o Puppeteer para automatizar a interação com a página de validação do Instituto Nacional de Tecnologia da Informação (ITI).

## Funcionalidades

- Recebe um arquivo PDF via upload.
- Usa Puppeteer para automatizar o processo de validação de assinaturas digitais no site do ITI.
- Retorna o resultado da validação ou uma mensagem de erro, se a validação falhar.

## Pré-requisitos

- Node.js (>= 12.x)
- npm ou yarn para gerenciamento de pacotes

## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/Gioestevam/validador-assinatura-gov
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd validador-assinatura-gov
    ```

3. Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor:
    ```bash
    npm start
    ```

2. O servidor estará ouvindo na porta `3000` por padrão. Você pode fazer requisições `POST` para o endpoint `/verify-signature` com um arquivo PDF anexado para validação.

### Exemplo de requisição cURL:

```bash
curl -F "file=@caminho/para/seu-arquivo.pdf" http://localhost:3000/verify-signature
```

## Estrutura do Projeto

- `server.ts`: Contém a lógica principal do servidor Express, incluindo o endpoint para upload do arquivo e a integração com o Puppeteer para validação de assinatura digital.
- `handle_map_error.ts`: Utilitário para mapear e retornar erros HTTP personalizados.

## Rotas

- `POST /verify-signature`
    - Aceita um arquivo PDF e realiza a validação no site do ITI.
    - Retorna o resultado da validação ou uma mensagem de erro.

### Validações

- Apenas um arquivo pode ser enviado por vez.
- O arquivo enviado deve ser um PDF.

## Tratamento de Erros

A função `mapHandleError` é utilizada para mapear e retornar erros adequados com base no código de resposta HTTP.

## Dependências

- `express`: Framework de servidor web.
- `puppeteer`: Biblioteca para controle de navegadores via programação.
- `express-fileupload`: Middleware para lidar com upload de arquivos em Express.