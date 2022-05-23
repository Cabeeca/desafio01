const express = require("express");
const res = require("express/lib/response");
const db = require("./models/db");
const app = express();
const Products = require("./models/Products");

app.use(express.json());

app.get("/", async (req, res) => {
  const products = await Products.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.json(products);
});

app.post("/product", async (req, res) => {
  //console.log(req.body);

  await Products.create(req.body)
    .then(() => {
      return res.json({
        erro: false,
        msg: "Produto cadastrado com sucesso!",
      });
    })
    .catch(() => {
      return res.status(400).json({
        erro: true,
        msg: "ERRO! Produto não cadastrado com sucesso!",
      });
    });
});

app.delete("/destroy/:id", async (req, res) => {
  await Products.destroy({ where: { id: req.params.id } })
    .then(() => {
      return res.json({
        erro: false,
        msg: "Produto deletado com sucesso!",
      });
    })
    .catch(() => {
      return res.json({
        erro: true,
        msg: "ERRO! Falha ao deletar produto!",
      });
    });
});

app.patch("/update", async (req, res) => {
  await Products.update(req.body, { where: { id: req.body.id } })
    .then(() => {
      return res.json({
        erro: false,
        msg: "Produto editado com sucesso!",
      });
    })
    .catch(() => {
      return res.json({
        erro: true,
        msg: "ERRO! Falha ao editar produto!",
      });
    });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
