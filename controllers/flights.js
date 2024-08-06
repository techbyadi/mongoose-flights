import { Flight } from '../models/flight.js'


function newFlight(req, res){
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

async function create(req, res) {
  try {
      //remove empty properties
  for(let key in req.body){
    if(req.body[key]==='') delete req.body[key];
  }
  //create entry in DB
  await Flight.create(req.body);
  //redirect page
  res.redirect('/flights/');
  } catch (error) {
    console.log(error);
    res.redirect('/flights/new');
  }
}

async function index(req, res) {
  try {
  //add details to the body
  const flights = await Flight.find({});
   //render show page
  res.render('flights/index', {
    flights,
    title: 'All Flights'
  })
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
}

export{
  newFlight as new,
  create, 
  index
}