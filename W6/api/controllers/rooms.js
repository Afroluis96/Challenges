const roomModel = require('../models/rooms');
const roleModel = require ('../models/userRoles');

const addRoom = (req, res) =>{
    //missing the auth validation
  if(!req.body){
    res.status(404).send({message: "No body found"});
  }
  const { price, roomName, capacity } = req.body;
  let room = new roomModel({
    roomName,
    capacity,
    price
  });
  room.save((err, roomStore) =>{
      
      if(err) res.status(500).send({message:`Error when savong the room ${err}`});

      res.status(200).send({room: roomStore});
  })
}

const findRoom = (req,res) =>{
    //missing the auth validation

    roomModel.find({}, function(err, room){
        if(err) console.log('error: ',err);
        res.send(room);
    });
   
}

module.exports = {
    addRoom,
    findRoom
}