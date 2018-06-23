

const dbK = require('../db/index.js');
const db = dbK();


const movies = db.import('../models/movies');
const users = db.import('../models/users');
const favorites = db.import('../models/favorites');

const favorite = (req,res) =>{

    if(!req.body || req.body.length === 0){
        console.log('request body not found');
        return res.sendStatus(400);
    }
    const {id_usuario} = req.body;
    if(!id_usuario) return res.status(400).send({ message: 'user is required' });

    var pa = req.url;
    var final_params = pa.split('/');
    var id_movie = Number(final_params[2]);
    
    movies.findOne({where:{id:id_movie,enable : 1}})
    .then(movie =>{
        if(movie !== null){
            favorites.findOne({where:{id_movie,id_user:id_usuario}})
            .then(favoriteMovie=>{

                if(favoriteMovie !== null){
                    console.log("Movie already liked, disliking..");
                    
                    favorites.update(
                        {state:0},
                        {where:{id_movie:id_movie, id_user:id_usuario}}
                    ).then(updated =>{
                        console.log("Not favorite anymore..");
                        res.status(204).send({message:'Unfavorited'});
                    }).then(updatingMovie =>{
                        var old = Number(movie.favs);
                        var n = old + -1;
                        movie.update(
                            {favs:  n},
                            {where:{id:id_movie}}
                        ).then(movieUpdated=>{
                            console.log('Movie updated');
                            res.send(movie);
                        }).catch(err=>{
                            console.log("Error when update movie",err);
                        })
                    }).catch(err =>{
                        console.log("error when update",er);
                        res.status(400).send('Try later');
                    })
                }
                else{
                    console.log("Field not found in the users favorites");
                    favorites.build({
                        id_movie,
                        id_user: id_usuario,
                        state:1
                    }).save()
                    .then(created =>{
                        console.log("Favorite added");
                    }).then(updating =>{
                        var old = Number(movie.favs);
                        var n = old + 1;
                        movie.update(
                            {favs:  n},
                            {where:{id:id_movie}}
                        ).then(movieUpdated=>{
                            console.log('Movie uodated');
                            res.send(movie);
                        }).catch(err=>{
                            console.log("Error when update movie",err);
                        })
                    }).catch(err =>{
                        console.log('error when creating',err)
                    })
                }

            }).catch(err =>{
                console.log("Error when searching in favorite table");
                res.status(400).send("Error");
            })
           
        }else{
            res.status(400).send({message: 'movie not available'})
        }
    })


}

const usersFavorites = (req, res) =>{
        
    if(!req.body || req.body.length === 0){
        console.log('request body not found');
        return res.sendStatus(400);
    }
  
    var pa = req.url;
    var final_params = pa.split('/');
    var id_user = Number(final_params[2]);

    movies.belongsToMany(users,{as:'Movie',through:'FavoriteMovie',foreignKey:'id_movie'});
    users.belongsToMany(movies,{as:'User',through:'FavoriteMovie',foreignKey:'id_user'});

    console.log(id_user);
}

module.exports = (app) =>{
  

    app.post(/\/movies\/\d\/fav$/,favorite);

    app.get(/\/users\/\d\/movies\/favorites$/,usersFavorites);
}