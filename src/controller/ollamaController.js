const axios = require('axios');

async function getResponseOllama(prompt){
    try {
        const response = await  axios.post('http://localhost:11434/api/generate',{
            model:'ouroconts',
            prompt:prompt,
            stream:false
        });

        responseJson = JSON.parse(response.data.response);

        return responseJson;
    } catch (error) {
        console.error('Erro ao obter resposta do Ollama: ', error.message);
    }
}

module.exports = {
    getResponseOllama
};