'use strict';
const router = require('express').Router();
const db = require('../db');
const crypto = require('crypto');

//Iterate through the routes object and mount the routes
let _registerRoutes = (routes,method)=>{
    for(let key in routes){
        if(typeof routes[key]=='object' && routes[key] != null && !(routes[key] instanceof Array)){
            _registerRoutes(routes[key],key);
        } else{
            //Register the routes
            if(method === 'get'){
                router.get(key, routes[key]);
            } else if(method === 'post'){
                router.post(key,routes[key]);
            }else{
                router.use(routes[key]);
            }            
        }
    }
}

let route = routes =>{
    _registerRoutes(routes);
    return router;
}

//Find a single user based on a key
let findOne = profileID => {
    return db.userModel.findOne({
        'profileId':profileID
    })
}

//crcate a new user and returns that instance
let createNewUser = profile =>{
    return new Promise((resolve,reject) =>{
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        newChatUser.save(error=>{
            if(error){
               // console.log('CReate New user Error');
                reject(error);
            }else{
                resolve(newChatUser);
            }
        })
    });
}

//The ES6 promisified version of findById
let findById = id =>{
    return new Promise((resolve, reject)=>{
        db.userModel.findById(id,(error, user)=>{
            if(error){
                reject(error);
            }else{
                resolve(user);
            }
        });
    });
}

//A middleware that checjs to see if the user is authenticated & logged in

let isAuthenticated =(req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

//Find a chatrrom by given name
let findRoomByName = (allrooms, room) =>{
    let findRoom = allrooms.findIndex((element, index, array) =>{
        if(element.room === room){
            return true;
        }else{
            return false;
        }
    });
    return findRoom > -1 ? true : false;
}

//a functions that generates a unique roomID
let randomHex = () =>{
    //console.log(crypto.randomBytes(24).toString('hex'));
    return crypto.randomBytes(24).toString('hex');
}

//find a cahtrrom wuth a given id
let findRoomById = (allrooms, roomID) =>{
    return allrooms.find((element, index, array) =>{
        if(element.roomID === roomID){
            return true;
        }else{
            return false;
        }
        
    });
}

//add user to a chatroom

let addUserToRoom = (allrooms, data, socket) =>{
    //get the room objetc
   
    let getRoom = findRoomById(allrooms, data.roomID);
    
    if(getRoom !== undefined){
       
        //get the active users id (objectID as used in session)
        let userID = socket.request.session.passport.user;
       
        //check to see if this user already exists in the chatroom
        let cheackUser = getRoom.users.findIndex((element, index, array) =>{
            if(element.userID == userID){
                return true;
            }else{
                return false;
            }
        });

            //if the user is already present in the room, remove hom first
            if(cheackUser > -1){
                getRoom.users.splice(cheackUser, 1);
            }

            //push the user into the rooms users array
            getRoom.users.push({
                socketID: socket.id,
                userID,
                user:data.user,
                userPic: data.userPic
            });
           

            //Join the room channel
            socket.join(data.roomID);

            //return the updated room object
            return getRoom;
    }
}

//find and purge the user when a socket disconnets
let removeUserFromRoom = (allrooms, socket)=>{
    for(let room of allrooms){
        //Find the user
        let findUser = room.users.findIndex((element, index, array)=>{
            if(element.socketID === socket.id){
                return true;
            }else{
                return false;
            }
        });
            //return element.socketID == soc=ket.id ? true : false
            if(findUser > -1){
                socket.leave(room.roomID);
                room.users.splice(findUser, 1);
                return room;
            }
        
    }
}

module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated,
    findRoomByName,
    randomHex,
    findRoomById,
    addUserToRoom,
    removeUserFromRoom

}