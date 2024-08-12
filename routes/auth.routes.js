
import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session);
    res.send('Auth route');
});

router.get('/:image', (req, res) => {
    const image = req.params.image;
    console.log(image);
    res.sendFile(image, { root: './uploads' });
});

router.post('/register', authController.registerPost);
router.post('/login', authController.loginPost);
router.get('/issigned', authController.isSignedIn);

export default router;
