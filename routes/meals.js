import { Router } from "express";
import * as mealCtrl from '../controllers/meals.js'

const router = new Router()

//GET localhost:3000/meals/new
router.get('/new', mealCtrl.new);

//POST localhost:3000/meals
router.post('/', mealCtrl.addMeal);

export {
  router
}