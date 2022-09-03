const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');
// const { use } = require('../routes');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('password');

    if (!user) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    const correctlogin = await bcrypt.compare(password, user.password);

    if (!correctlogin) {
      return res.status(401).json({ error: 'E-mail ou senha incorretos' });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, 'aaaaaa', { expiresIn: '1d' });
    return res.json({ token });
  }

  async changepassword(req, res) {
    const { email, password, newpassword } = req.body;
    const user = await userModel.findOne({ email }).select('password');

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para trocar a senha' });
    }

    const correctlogin = await bcrypt.compare(password, user.password);

    if (!correctlogin) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para trocar a senha' });
    }

    const hashPass = await bcrypt.hash(newpassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, { password: hashPass });

    return res.status(201).json({ msg: 'Senha alterada com sucesso!' });
  }

  async createResetToken(req, res) {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'houve um problema para resetar a senha' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const tokenExpires = String(now);

    const { _id: id } = user;

    await userModel.findOneAndUpdate(id, { token, tokenExpires });

    // enviar e-mail com o link gerado

    return res
      .status(201)
      .json({ msg: `utilize o token: ${token} até ${tokenExpires}` });
  }

  async resetPassword(req, res) {
    const { email, newpassword } = req.body;
    /* qualquer coisa colocar o token */

    const user = await userModel
      .findOne({ email })
      .select('tokenExpires password token');

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Houve um problema para resetar a senha!' });
    }
    const now = new Date();

    if (now > user.tokenExpires) {
      return res.status(401).json({ error: 'Token errado!' });
    }

    const hashpass = await bcrypt.hash(newpassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, {
      password: hashpass,
      token: '',
      tokenExpires: '',
    });

    return res.status(201).json({ msg: 'Senha resetada com sucesso!' });
  }
}

module.exports = new AuthController();
