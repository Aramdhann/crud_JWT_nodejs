import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Your username is required',
      maxlength: 25,
    },
    email: {
      type: String,
      required: 'Your email is required',
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
      trim: true,
    },
    password: {
      type: String,
      required: 'Your password is required',
      select: false,
    },
  },

  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  const user = this

  // hashing password
  if (!user.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    next()
  } catch (error) {
    return next(error)
  }
})

export default mongoose.model('users', userSchema)
