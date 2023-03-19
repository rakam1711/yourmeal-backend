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
    type: {
      emails: {
        type: [String],
        required: true
      },
      phones: {
        type: [String],
        required: true
      }
    },
    require: true
  },

  images: {
    type: [String],
    require: true
  },

  tags: {
    type: [String],
    require: true
  },

  address: {
    type: String,
    require: true
  },

  menu: {
    type: [{
      name: {
        type: String,
        required: true
      },

      thumbnail: {
        type: String,
        required: false
      },

      price: {
        type: Number,
        required: true
      },

      quantity: {
        type: String,
        required: true
      }
    }],
    require: false
  }
})

const Resturants = mongoose.model('Resturants', resturantSchema)

export default Resturants
