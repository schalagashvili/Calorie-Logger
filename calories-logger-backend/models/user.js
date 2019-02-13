import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  expectedCalories: { type: Number },
  role: { type: String, default: 'regular' },
  logsCount: { type: Number },
  mealLog: [
    {
      title: { type: String },
      date: { type: Date },
      calories: { type: Number }
    }
  ]
})

userSchema.pre('save', function(next) {
  const user = this
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

const user = mongoose.model('User', userSchema)

module.exports = user
