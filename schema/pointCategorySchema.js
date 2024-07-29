const mongoose = require('mongoose');

const pointCategorySchema = new mongoose.Schema({
pointId: {
    type: mongoose.Types.ObjectId,
    ref: 'point'
},
badgeId: {
    type: mongoose.Types.ObjectId,
    ref: 'bagde'
},
weighting : {
    type: Number,
}
}, {timestamps: true})

let point_category = mongoose.model('Point_category',  pointCategorySchema, 'point_categories' );
module.exports = { Point_category: point_category  }
