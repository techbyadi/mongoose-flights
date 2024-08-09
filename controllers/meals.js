import { Meal } from "../models/meal.js";


async function newMeal(req, res) {
  try {
    const meals = await Meal.find({})
    res.render('meals/new.ejs', {
    title: 'Add Meal', 
    meals
  })
  } catch (error) {
    console.log(error);
    res.redirect('/flights')
  }
}

async function addMeal(req, res) {
  try {
    const existingMeal = await Meal.findOne({
      name: req.body.name
    })

    if(existingMeal){
      return res.render('meals/new', 
      { errorMessage: 'Meal already exists',
        title: 'Add Meal',
        meals : await Meal.find({})
      },
    );
    }

    const meals = await Meal.create(req.body)
    res.redirect('/meals/new')
  } catch (error) {
    console.log(error);
    res.redirect('/meals/new')
  }
}

export {
  newMeal as new,
  addMeal
}