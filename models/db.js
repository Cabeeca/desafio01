const Sequelize = require("sequelize");
const db = new Sequelize("desafio01h", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


/*db.authenticate()
  .then(() => {
    console.log("Conexão com DB realizada!");
  })
  .catch(() => {
    console.log("ERRO! Conexão com DB não realiazda!");
  });*/

module.exports = db;
