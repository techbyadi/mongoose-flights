import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

//GET localhost:3000/flights/
router.get('/', flightsCtrl.index);
// GET localhost:3000/flights/new
router.get('/new', flightsCtrl.new);
//POST localhost:3000/flights/
router.post('/', flightsCtrl.create);
//GET localhost:3000/flights/:flightId
router.get('/:flightId', flightsCtrl.show);
//DELETE localhost:3000/flights/:flightId
router.delete('/:flightId', flightsCtrl.delete);
//GET localhost:3000/flights/:flightId/edit
router.get('/:flightId/edit', flightsCtrl.edit)
//UPDATE localhost:3000/flights/:flightId
router.put('/:flightId', flightsCtrl.update)
//POST localhost:3000/flights/:flightId/tickets
router.post('/:flightId/tickets', flightsCtrl.addTicket);
//DELETE localhost:3000/flights/:flightId/tickets/:ticketId
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket);
router.post('/:flightId/meals', flightsCtrl.addMealToFlight);

export { router }
