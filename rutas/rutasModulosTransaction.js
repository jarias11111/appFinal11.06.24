const express = require('express');
const router = express.Router();
const Transaction = require('../modelos/transaction');

// Ruta para obtener todas las transacciones
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('item_id user_id');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener una transacción por ID
router.get('/:id', getTransaction, (req, res) => {
    res.json(res.transaction);
});

// Ruta para crear una nueva transacción
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        item_id: req.body.item_id,
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        total_price: req.body.total_price
    });
    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para actualizar una transacción por ID
router.patch('/:id', getTransaction, async (req, res) => {
    if (req.body.item_id != null) {
        res.transaction.item_id = req.body.item_id;
    }
    if (req.body.user_id != null) {
        res.transaction.user_id = req.body.user_id;
    }
    if (req.body.quantity != null) {
        res.transaction.quantity = req.body.quantity;
    }
    if (req.body.total_price != null) {
        res.transaction.total_price = req.body.total_price;
    }
    try {
        const updatedTransaction = await res.transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ruta para eliminar una transacción por ID
router.delete('/:id', getTransaction, async (req, res) => {
    try {
        await res.transaction.deleteOne();
        res.json({ message: 'Transacción eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener una transacción por ID
async function getTransaction(req, res, next) {
    let transaction;
    try {
        transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: 'No se pudo encontrar la transacción' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.transaction = transaction;
    next();
}

module.exports = router;
