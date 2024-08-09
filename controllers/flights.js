import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js';


function newFlight(req, res){
  const newFlight = new Flight();
  const departsDate = newFlight.departs.toISOString().slice(0, 16);
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate
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

async function show(req, res) {
  try {
  //fetch details by ID
  const flight = await Flight.findById(req.params.flightId).populate('meals');
  const meals = await Meal.find({_id: {$nin: flight.meals}});
  //render a show page
  res.render('flights/show', {
    flight,
    title: 'Flight Detail',
    meals
  })
  } catch (error) {
    console.log(error);
    res.redirect('/flights');
  }
}

async function deleteFlight(req, res) {
  try {
    //find a flight by and delete it
    await Flight.findByIdAndDelete(req.params.flightId);
    //redirect to all flights page
    res.redirect('/flights');
  } catch (error) {
    console.log(error);
    res.redirect('/flights');
  }
}

async function addTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId);
    flight.tickets.push(req.body);
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
}

async function deleteTicket(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId);
    const ticket = await flight.tickets.id(req.params.ticketId).deleteOne();
    await flight.save();
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error);
    res.redirect(`/flights`)
  }
}

async function addMealToFlight(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId);
    flight.meals.push(req.body.mealId)
    await flight.save();
    console.log(flight);
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error);
    res.redirect('/flights');
  }
}


export{
  newFlight as new,
  create, 
  index, 
  show, 
  deleteFlight as delete,
  addTicket,
  deleteTicket,
  addMealToFlight
}