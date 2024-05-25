const Record = require('../Models/record.js');

exports.getRecords = async (req, res) => {
    let {id} = req.params;
    try {
        const records = await Record.find();
        if (!records) {
            // No records found with the given id
            return res.status(404).send('No records found');
        }
        res.render('record/index.ejs', { records, currUser: req.user });
    } catch (err) {
        res.status(500).send(err);
    }
};



exports.createRecord = async (req, res) => {
    // Assuming req.user._id contains the user ID
    const userId = req.user._id;

    // Extract other record details from the request body
    const { domain, type, value } = req.body;

    try {
        // Create a new record with the owner ID set to the user ID
        const record = new Record({
            domain,
            type,
            value,
            owner: userId // Set the owner field to the user ID
        });

        // Save the record to the database
        await record.save();
        res.redirect("/");
        req.flash("success","record created successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const record = await Record.findById(id);
    if(!record){
        req.flash("error","Record you requested for, does not exist!");
        res.redirect("/");
    }
    res.render("record/edit.ejs",{record});
};

module.exports.updateRecord = async (req, res) => {
    const { id } = req.params;
    const { domain, type, value } = req.body;

    try {
        const record = await Record.findByIdAndUpdate(id, { domain, type, value }, { new: true });
        if (!record) {
            return res.status(404).send('Record not found');
        }

        res.redirect(`/`); // Redirect to the record's page or another appropriate location
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteRecord = async (req, res) => {
    try {
        let deletedrecord = await Record.findByIdAndDelete(req.params.id);
        console.log(deletedrecord);
        req.flash("success","Record deleted successfully!");
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
};
