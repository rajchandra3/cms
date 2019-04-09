var express = require('express');
var router = express.Router();
var _ = require('underscore');
var Show = require('./schema');
var Controller = require('./controller');

/* GET home page. */
router.get('/', (req, res)=> {
  res.send("Welcome to movie booking system");
});

// Add moviee
router.get('/add',(req,res)=>{
  var shows = [];
  _.each(req.body.shows,(show)=>{
    shows.push({
      shows:[{ // shows 
        starts:show.starts,
        ends:show.ends
      }]
    })
  })
  Show.create({
    title:req.body.title, //movie title
    releasesOn:req.body.releasesOn, //release data
    shows:shows
  })
})

// Show all the movies to user 
router.get('/shows/all',(req,res)=>{
  Show.find({},(err,shows)=>{
    if(err){
      res.send({code:1,message:`Couldn't fetch shows at this time!`});
    }else{
      res.send({code:0,message:`Showing ${shows.length} shows`, all_shows:shows});
    }
  })
})

// Show live events
router.get('/shows/live',(req,res)=>{
  Show.find({releasesOn:req.releasesOn},(err,shows)=>{
    if(err){
      res.send({code:1,message:`Couldn't fetch live at this time!`});
    }else{
      res.send({code:0,message:`Showing ${shows.length} live shows`, live_shows:shows});
    }
  })
})

// User can book ticket for any show
router.get('/show/book/:id',(req,res)=>{
  let id = req.params.id;
  Show.findOne({_id:id},(e,show)=>{
    if(e){
      res.send({code:1,message:`Error while fetching data with ${id}`});
    }else if(!show){
      res.send({code:1,message:`There is no show with id : ${id}`});
    }else{
      res.send({code:0,message:`Ticket booked successfully!`});
    }
  })
})

module.exports = router;