import { Flight } from '../models/flight.js'


function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

async function create(req, res) {
  //create entry in DB
  await Flight.create(req.body);
  res.redirect('/flights/new');
  //redirect page
}

export{
  newFlight as new,
  create
}