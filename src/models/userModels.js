const bcrypt = require('bcryptjs');
const mongoose = require('../config/mongo');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async (next) => {
  const hashPass = await bcrypt.hash(this.password, 10);
  this.password = hashPass;

  next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

// module.exports = userModel;
