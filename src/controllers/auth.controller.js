const { Users } = require('../database')

const loginController = async (req) => {
  const { username, password } = req.body
  const errors = {}
  const data = {}

  block: try {
    const user = await Users.findOne({ username })
    if(!user){
      errors.message = "User not found"
      break block
    }

    const isMatch = await user.verifyPassword(password)
    if(!isMatch) {
      errors.message = "Username and Password do not match"
      break block
    }

    const token = user.getSignedToken()
    if(!token) {
      errors.message = "Unable to login the user. Please contact the server admin"
      break block
    }

    data.token = token

  } catch(error) {
    errors.message = error
    console.log(error)

  } finally {
    return { 
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

const registerController = async (req) => {
  const { username, password, role } = req.body
  const errors = {}
  const data = {}

  block: try {
    const checkUserExists = await Users.findOne({ username })

    if(checkUserExists) {
      errors.message = "Username already in use"
      break block
    }
    const user = await Users.create({ username, password, role })

    const token = user.getSignedToken()
    data.token = token

  } catch (error) {
    errors.message = error
    console.error(error)

  } finally {
    return { 
      success: Object.keys(errors).length < 1,
      errors,
      data
    }
  }
}

module.exports = {
  loginController,
  registerController
}