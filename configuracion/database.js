const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.IDENTIFICADORDERECURSOSUNIFORME, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Data Base connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = conectarDB;