# Whastapp API

API para envio e recebimento de mensagens para whatsapp

## Instalação

* Instale as dependencias do projeto
*Atenção: É necessário ter o node instalado*

```bash
npm install
```
* Execute o projeto

```bash
npm start
```
* Faça a leitura do QR code quando for exibido

## Enviar Mensagem

Para enviar uma mensagem, faça uma requisição POST para o endpoint `/send`, e porta `3000` passando o conteúdo da mensagem e o telefone do destinatário no body do request:

```json
{
    "phone": "5511999999999",
    "message": "Ola mundo"
}
```

Ao executar a requisição, a mensagem será enviada para o telefone do destinatário e você recebera uma `string` com o resultado (sucesso, falha ou erro).

```json
{
	"message": "Mensagem enviada com sucesso"
}
```

## TODO

- Implementar o recebimento de mensagens
- Implementar o envio de mensagens para grupos
- Implementar o envio de midias