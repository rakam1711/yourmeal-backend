import mongoose from 'mongoose'

const resturantSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  description: {
    type: String,
    require: true
  },

  contacts: {
    type: String,
    require: true
  },

  images: {
    type: String,
    require: true
  },

  tag: {
    type: String,
    require: true
  },

  address: {
    type: String,
    require: true
  },

  menu: {
    type: String,
    require: true
  }
})

const Resturants = mongoose.model('Resturants', resturantSchema)

export default Resturants
