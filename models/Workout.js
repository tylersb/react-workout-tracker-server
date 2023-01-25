const mongoose = require('mongoose')

const WorkoutSchema = new mongoose.Schema(
  {
    date: {
      type: Date
    },
    exercise: {
      type: String
    },
    weight: {
      type: Number
    },
    reps: {
      type: Number
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Workout', WorkoutSchema)
