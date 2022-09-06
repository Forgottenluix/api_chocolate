const chocolatemodel = require('../models/chocolateModel');

class Chocolatecontroller {
  async store(req, res) {
    const { userId } = req; //* usuário Logado*//
    const infosToSave = {
      ...req.body,
      registerUserId: userId,
      updaterUserId: userId,
    };
    console.log(infosToSave);

    const chocolate = await chocolatemodel.create(infosToSave);
    return res.status(201).json({ chocolate });
  }

  async delete(req, res) {
    const { id } = req.params;

    const chocolate = await chocolatemodel.findById();

    if (!chocolate) {
      return res.status(400).json({ msg: 'Chocolate não encontrado' });
    }
    await chocolatemodel.findByIdAndDelete(id);
    return res.json({ msg: 'Chocolate deletado com sucesso' });
  }

  async update(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const chocolate = await chocolatemodel.findById(id);

    if (!chocolate) {
      return res.status(400).json({ msg: 'Chocolate não encontrado' });
    }

    const { name, details, value } = req.body;

    const chocolatUpdate = {
      name,
      details,
      value,
      updaterUserId: userId,
    };

    const infosToupdate = {
      ...req.body,
      updaterUserId: userId,
    };

    const newChocolate = await chocolatemodel.findByIdAndUpdate(
      id,
      chocolatUpdate,
      {
        new: true,
      }
    );
    return res.jason({ newChocolate });
  }

  async show(req, res) {
    const { id } = req.params;
    const chocolate = await chocolatemodel.findById(id);

    return res.json({ chocolate });
  }

  async index(req, res) {
    const chocolates = await chocolatemodel.find();

    return res.json({ chocolates });
  }
}

module.exports = new Chocolatecontroller();
