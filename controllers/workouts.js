const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await db.Workout.find({})
    res.json(workouts)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// POST /workouts
router.post('/', async (req, res) => {
  try {
    await db.Workout.create(req.body)
    res.status(201).redirect('/workouts')
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
})

// GET /workouts/:id
router.get('/:id', async (req, res) => {
  try {
    const workout = await db.Workout.findById(req.params.id)
    res.json(workout)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      res.status(404).json({ message: 'Workout not found' })
    } else {
      res.status(500).json({ message: 'Server Error' })
    }
  }
})

// PUT /workouts/:id
router.put('/:id', async (req, res) => {
  try {
    const workout = await db.Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!workout) {
      res.status(404).json({ message: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      res.status(404).json({ message: 'Workout not found' })
    } else {
      res.status(500).json({ message: 'Server Error' })
    }
  }
})

// DELETE /workouts/:id
router.delete('/:id', async (req, res) => {
  try {
    const workout = await db.Workout.findByIdAndDelete(req.params.id)
    if (!workout) {
      res.status(404).json({ message: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    console.log(err)
    if (err.name === 'CastError') {
      res.status(404).json({ message: 'Workout not found' })
    } else {
      res.status(500).json({ message: 'Server Error' })
    }
  }
})

module.exports = router
