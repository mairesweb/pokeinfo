// Endpoint do OpenSearch
const url = "/api/poke/_doc";

export const postLog = async (document: any) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(document)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText);
    }
    return response.json();  // Converte a resposta JSON em um objeto JavaScript
  })
  .then(data => console.log(data))  // Manipula a resposta do servidor
  .catch(error => console.error('Erro:', error));  // Trata erros de requisição
}