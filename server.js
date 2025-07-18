const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Middleware para interpretar formulários do tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROTAS
// Rota principal - envia o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Rota sugestao
app.get('/sugestao', (req, res) => {
  const { nome, ingredientes } = req.query;

  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p><strong>Ingredientes sugeridos:</strong> ${ingredientes}</p>
    <a href="/">Voltar ao Início</a>
  `);
});

// Rota contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post('/contato', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.send(`
    <h1>Mensagem Recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao Início</a>
  `);
});

// json api lanches
const fs = require('fs');

app.get('/api/lanches', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao ler os lanches' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// pagina 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
