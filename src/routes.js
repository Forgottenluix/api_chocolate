const routes = require('express').Router();
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const chocolateController = require('./controllers/chocolateCrontroler');
const jwtMid = require('./middlewares/jwt');

routes.get('/', (req, res) => res.json({ msg: 'Tudo certo!' }));

/* ROTAS DE AUTENTICAÇÃO SEM JWT */
routes.post('/login', authController.login);
routes.post('/reset-token', authController.createResetToken);
routes.post('/reset-password', authController.resetPassword);

routes.use(jwtMid);

/* ROTAS DO USUÁRIO */
routes.get('/user', userController.index);
routes.post('/user', userController.store);
routes.get('/user/:id', userController.show);
routes.delete('/user/:id', userController.delete);
routes.put('/user/:id', userController.update);

/* ROTAS DE AUTENTICAÇÃO */
routes.post('/change', authController.changepassword);

/* ROTAS DO CHOCOLATE */

routes.post('/chocolate', chocolateController.store);
routes.get('/chocolate', chocolateController.index);
routes.get('/chocolate/:id', chocolateController.show);
routes.delete('/chocolate/:id', chocolateController.delete);
routes.put('/chocolate/:id', chocolateController.update);

module.exports = routes;
