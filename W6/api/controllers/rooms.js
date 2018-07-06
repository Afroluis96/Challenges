const roomModel = require('../models/rooms');
const roleModel = require ('../models/userRoles');

const addRoom = (req, res) =>{
  if(!req.body){
    res.status(404).send({message: "No body found"});
  }
  const { price, roomName, capacity } = req.body;
  let room = new roomModel();

  room.roomName = roomName;
  room.price = price;
  room.capacity = capacity;

  console.log(room);

  room.save((err, roomStore) =>{
      console.log('que pex');
      if(err) res.status(500).send({message:`Error when savong the room ${err}`});

      res.status(200).send({room: roomStore});
  })
}

const findRoom = (req,res) =>{
    
    roleModel.findOne({roleName:'Client'}, function(err, room){
        if(err) console.log('error: ',err)
        console.log(room);
        res.send(room);
    });
   
}

module.exports = {
    addRoom,
    findRoom
}