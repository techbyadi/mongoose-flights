import { Flight } from '../models/flight.js'


function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

async function create(req, res) {

  //remove empty properties
  for(let key in req.body){
    if(req.body[key]==='') delete req.body[key];
  }

  //create entry in DB
  await Flight.create(req.body);
  //redirect page
  res.redirect('/flights/new');

}

export{
  newFlight as new,
  create
}