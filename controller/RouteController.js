const Record = require('../Models/record.js');

exports.getRecords = async (req, res) => {
    try {
        const records = await Record.find();
        res.render('record/index.ejs', { records });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createRecord = async (req, res) => {
    try {
        const record = new Record(req.body);
        await record.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        await Record.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
};
