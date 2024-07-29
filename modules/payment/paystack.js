const axios = require('axios');
const { AlphaNumeric } = require('../../utils');

const Paystack = () => {
    const baseUrl = process.env.PAYSTACK_BASE_URL
    const headersRequest = { 'Content-Type': 'application/json', 'cache-control': 'no-cache', 'Authorization': `Bearer ${process.env.PAYSTACK_SK_KEY}` };


    const InitializePayment = async (body) => {
        return await axios.post(`${baseUrl}/transaction/initialize`, { ...body, reference: AlphaNumeric(20).toUpperCase() }, { headers: { ...headersRequest } }).then((response) => {
            return response;
        }).catch((error) => {
            return error.response
        })
    }

    const VerifyPayment = async (reference) => {
        return await axios.get(`${baseUrl}/transaction/verify/${reference}`, { headers: { ...headersRequest } }).then((response) => {
            return response.data;
        }).catch((error) => {
            return error.response
        })
    }

    return { InitializePayment, VerifyPayment };
}

module.exports = Paystack