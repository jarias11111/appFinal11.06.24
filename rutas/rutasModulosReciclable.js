const express = require('express');
const router = express.Router();
const Reciclable = require('../modelos/reciclable');

// Ruta para obtener todos los reciclables
router.get('/', async (req, res) => {
    try {
        const reciclables = await Reciclable.find();
        res.json(reciclables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un reciclable por ID
router.get('/:id', getReciclable, (req, res) => {
    res.json(res.reciclable);
});

// Ruta para crear un nuevo reciclable
router.post('/', async (req, res) => {
    const reciclable = new Reciclable({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    });
    try {
        const newReciclable = await reciclable.save();
        res.status(201).json(newReciclable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar un reciclable por ID
router.patch('/:id', getReciclable, async (req, res) => {
    if (req.body.name != null) {
        res.reciclable.name = req.body.name;
    }
    if (req.body.quantity != null) {
        res.reciclable.quantity = req.body.quantity;
    }
    if (req.body.price != null) {
        res.reciclable.price = req.body.price;
    }
    try {
        const updatedReciclable = await res.reciclable.save();
        res.json(updatedReciclable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar un reciclable por ID
router.delete('/:id', getReciclable, async (req, res) => {
    try {
        await res.reciclable.deleteOne();
        res.json({ message: 'Reciclable eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener un reciclable por ID
async function getReciclable(req, res, next) {
    let reciclable;
    try {
        reciclable = await Reciclable.findById(req.params.id);
        if (reciclable == null) {
            return res.status(404).json({ message: 'No se pudo encontrar el reciclable' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.reciclable = reciclable;
    next();
}

module.exports = router;
