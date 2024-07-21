module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getCardNumber: function() {
        const number = Math.floor(100000000000 + Math.random() * 900000000000)
        return `${number}`
    },
    getCardCode: function() {
        const number = Math.floor(100 + Math.random() * 900)
        return `${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    }
};
