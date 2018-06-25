

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
    const {idUser} = req.body;
    if(!idUser) return res.status(400).send({ message: 'user is required' });

    var pa = req.url;
    var final_params = pa.split('/');
    var idMovie = Number(final_params[2]);
    
    movies.findOne({where:{id:idMovie,enable : 1}})
    .then(movie =>{
        if(movie !== null){
            favorites.findOne({where:{idMovie,idUser}})
            .then(favoriteMovie=>{

                if(favoriteMovie !== null){
                    console.log("Movie already liked, disliking..");
                    
                    favorites.update(
                        {state:0},
                        {where:{id_movie:idMovie, idUser}}
                    ).then(updated =>{
                        console.log("Not favorite anymore..");
                        res.status(204).send({message:'Unfavorited'});
                    }).then(updatingMovie =>{
                        var old = Number(movie.favs);
                        var n = old + -1;
                        movie.update(
                            {favs:  n},
                            {where:{id:idMovie}}
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
                        idMovie,
                        idUser,
                        state:1
                    }).save()
                    .then(created =>{
                        console.log("Favorite added");
                    }).then(updating =>{
                        var old = Number(movie.favs);
                        var n = old + 1;
                        movie.update(
                            {favs:  n},
                            {where:{id:idMovie}}
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


//movies.belongsToMany(users,{as:'Movie',through:'FavoriteMovie',foreignKey:'id_movie'});
//users.belongsToMany(movies,{as:'User',through:'FavoriteMovie',foreignKey:'id_user'});

const usersFavorites = (req, res) =>{
        
    if(!req.body || req.body.length === 0){
        console.log('request body not found');
        return res.sendStatus(400);
    }
  
    var pa = req.url;
    var final_params = pa.split('/');
    var idUser = Number(final_params[2]);  

    
    favorites.findAll({
        where:{
            idUser,
            state:1
        }
    }).then(records =>{
        if(records !== null){
            var cont = 0;
            var moviesObject = records.map;
            var moviesArrayLenght = Object.keys(records).length;
            console.log("Length: ",moviesArrayLenght);
            let movieLiked = new Array();
                for(let record in records){
                    console.log("Movies found: ",records[record].idMovie);
                    movies.findOne({
                        attributes:{
                            exclude:['enable','favs']
                        },
                        where:{
                            id:records[record].idMovie
                        }
                    }).then(movie =>{
                     
                        if(movie !== null){
                            cont += 1;
                            movieLiked.push(movie);
                            if(cont === moviesArrayLenght){
                                res.send(JSON.stringify(movieLiked,undefined,2));
                            }
                        }
                        else{
                            console.log("Couldnt find the movie in records");
                        }
                    }).catch(error =>{
                        console.log("Error when finding the movie");
                        res.status(404).send("Error when finding the movie");
                    })
                
                }
                //res.send(movieLiked);
        }else{
            console.log("No movies found with this user");
        }
    }).catch(error =>{
        console.log("Error in searching favorites: ",error);
        res.status(404).send({message:"Error when searching"});
    })

}

module.exports = (app) =>{
  

    app.post(/\/movies\/\d\/fav$/,favorite);

    app.get(/\/users\/\d\/movies\/favorites$/,usersFavorites);
}