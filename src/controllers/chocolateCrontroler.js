const chocolatemodel = require('../models/chocolateModel');

class Chocolatecontroller {
  async store(req, res) {
    const chocolate = await chocolatemodel.create(req.body);
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
    const { id } = req.params;
    const chocolate = await chocolatemodel.findById(id);

    if (!chocolate) {
      return res.status(400).json({ msg: 'Chocolate não encontrado' });
    }

    const newChocolate = await chocolatemodel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
