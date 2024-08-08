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

//POST localhost:3000/flights/:flightId/tickets
router.post('/:flightId/tickets', flightsCtrl.addTicket);

export { router }
