const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema ({
        subscriptionName  : {type : String},
        payPerService: {
            type :Boolean,
            default: false 
        },
        monthlyPlan : [{
            chat : Number,
            planAmount: Number,
            wellnessCheckup: Number,
            virtualConsultation: Number,
            startDate : {
            type: Date,
            default: Date.now
            },
            endDate: {
                type: Date,
                default: +new Date() + 30*24*60*60*1000 // 30 days from the current date
            }
    }],
        yearlyPlan : [{
            chat : Number,
            planAmount: Number,
            wellnessCheckup: Number,
            virtualConsultation: Number,
            startDate : {
                type: Date,
                default: Date.now
            },
            endDate: {
                type: Date,
                default: +new Date() + 30*24*60*60*12*1000 // 30 * 12(months) days from the current date
            }
        }],
}, { timestamps : true})

const earningsSchema = new Schema ({
    chat  : {
        amount: String,
    },
    wellnessCheckup  : {
        amount: String,
    },
    virtualConsultation:{
        amount: String,
    }
    
}, { timestamps : true})

 
let DoctorEarnings = mongoose.model('DoctorEarnings', earningsSchema);
let AppSubscription = mongoose.model('AppSubscription', subscriptionSchema);

module.exports = {AppSubscription :AppSubscription  , DoctorEarnings: DoctorEarnings}