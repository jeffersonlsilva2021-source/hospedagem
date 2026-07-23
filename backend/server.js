import express from 'express'
import OpenAI from 'openai'
import cors from 'cors'

const app = express()

app.use(express.json()) // CONSEGUIR UTILIZAR JSONS NO NOSSO CODIGO COM O EXPRESS
app.use(cors())

const endpoint = "https://foundry0807.services.ai.azure.com/openai/v1";
const deploymentName = "gpt-5.4-mini";
const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({
    baseURL: endpoint,
    apiKey: apiKey
});

app.get('/', (req, res) => {
    res.send('Seja bem vindo ao Servidor! Você está usando a rota raiz (/)')
})

app.post('/chatbot', async (req, res) => {
    let mensagemUsuario = req.body.mensagem

    const resposta = await openai.responses.create({
        model: deploymentName,
        input: mensagemUsuario
    })

    res.json({respostaChat: resposta.output_text })
})

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000')
})