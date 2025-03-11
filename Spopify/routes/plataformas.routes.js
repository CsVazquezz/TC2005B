const express = require('express');
const router = express.Router();
const plataformasController = require('../controllers/plataformas.controller');

const isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.cookie('redirectTo', req.originalUrl, { httpOnly: true });
        return res.redirect('/');
    }
    next();
};

router.get('/', plataformasController.getAll);

router.get('/agregar', isAuth, plataformasController.getNew);
router.post('/agregar', isAuth, plataformasController.postNew);

router.get('/editar/:id', isAuth, plataformasController.getEdit);
router.post('/editar', isAuth, plataformasController.postEdit);

module.exports = router;