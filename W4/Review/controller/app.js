const Sequelize = require('sequelize');

const dbBack = require('../db/index.js');
const db = dbBack(Sequelize);

const auto = db.import('../models/autos');
const marca = db.import('../models/marcas');

marca.hasMany( auto, {foreignKey :'id_marca',sourceKey: 'id_marca'});
auto.belongsTo(marca,{foreginKey:'id_marca', targetKey : 'id_marca'});

let dataAutos = marca.findAll({
                where:{
                    id_marca: 1
                },
                include:{model:auto}
                })
            .then(snap=>{   
                return snap;
            }).catch(error=>{
                console.log('Error en dataAutos:',error)
            });

console.log(dataAutos);

module.exports = (app) =>{

    app.get('/autos', function(req,res){
        res.send(dataAutos);
    })
}