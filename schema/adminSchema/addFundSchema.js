const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddFundSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'externalModelType'
    },
    externalModelType: {
      type: String,
    },
    amount: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });
let addFund = mongoose.model('AddFund', AddFundSchema, 'addfunds');
module.exports = { AddFund: addFund }