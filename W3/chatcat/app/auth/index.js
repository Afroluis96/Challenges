'use strict';
const passport = require('passport');
const config = require('../config');
const h = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () =>{

    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser((id,done)=>{
         //Find the user using the_id
         h.findById(id)
         .then(user =>{
             done(null, user);
         }).catch(error => console.log('Error when deserializing the user'));
    })

    let authProcessor = (accesToken, refreshToken, profile, done)=>{
        //Finde a user in the local db using profile.id
        //If the user is found, return the user data using the done()
        //if the user is not found, create one in the local db
        h.findOne(profile.id)
        .then(result => {
            if(result){
                done(null, result);
            }else{
                //create a new user and return
                h.createNewUser(profile)
                .then(newChatUser =>{
                    done(null, newChatUser)
                }).catch(error => console.log('Error creating a new user'))
            }
        });
    }
    passport.use(new FacebookStrategy(config.fb, authProcessor));
    passport.use(new TwitterStrategy(config.twitter, authProcessor));
}