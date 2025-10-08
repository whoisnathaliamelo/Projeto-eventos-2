const express = require("express");
const app = express();
app.use(express.json());

const eventos = [
  {
    id: 1,
    tituloEvento: "Festival de músicas",
    descricao: "Evento de música com diversas atrações",
    categoria: "Musica",
    dataInicio: new Date(2025, 7, 15),
    dataFim: new Date(2025, 7, 15),
    localizacao: "Sesc Teresópolis, varzea",
    preco: 50.0,
    disponibilidade: "Disponivel",
  },
];

app.get("/eventos/:id", (req, res) => {
  const id = Number(req.params.id);
  const evento = eventos.find((l) => l.id === id);
  if (!evento) return res.status(404).json({ error: "Evento não encontrado" });
  return res.json(evento);
});

app.get("/eventos", (req, res) => {
  return res.json(eventos);
});

app.post("/eventos ", (req, res) => {
  const novoEvento = req.body;

  const camposObrigatorios = [
    "tituloEvento",
    "descricao",
    "categoria",
    "dataInicio",
    "dataFim",
    "localizacao",
    "preco",
    "disponibilidade",
  ];

  const todosPreenchidos = camposObrigatorios.every(
    (campo) => novoEvento[campo]
  );

  if (!todosPreenchidos) {
    return res.status(400).json({
      error: "Todos os campos obrigatórios devem ser preenchidos",
    });
  }
  novoEvento.id = eventos.length + 1;
  eventos.push(novoEvento);

  res.status(201).json(novoEvento);
});

app.delete("/eventos/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = eventos.findIndex(e => e.id === id)
    
    if (index === -1) {
        return res.status(404).json({ error: "Evento não encontrado"})
    }
    eventos.splice(index, 1);
    return res.status(204).send();
})

app.listen(3000, () => console.log("API ouvindo em http://localhost:3000"));
