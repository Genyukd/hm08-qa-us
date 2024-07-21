module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '.card-second-row #code',
    messageField: '#comment',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: '//div[starts-with(text(), "Supportive")]',
    paymentMethodButton: '.pp-text',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkButton: 'button=Link',
    closeButton: '//*[@id="root"]/div/div[2]/div[2]/div[1]/button',
    addOneIceCream: '.counter-plus',
    orderButton: '.smart-button',
   
    
    // Others
    addedCard: '#card-1', 
    orderBlanketButton: '.r-sw',
    orderBlanketSwitch: '.switch-input',
    addedIceCreams: '.counter-value',
    activeTariff: '.tcard.active',

    // Modals
    phoneNumberModal: '.modal',
    addCardModal: '.modal',
    paymentMethodModal: '.payment-picker',
    carSearchModal: '.order-body',
    driverArriving: '.order-header-title',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        //check correct values of From and To fields
        await expect(fromField).toHaveValue(from);
        await expect(toField).toHaveValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },

    chooseSupportivePlan: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed;
        await supportivePlanButton.click();
        //check that Supportive Plan is selected
        const activeTariff = await $(this.activeTariff).getText();
        await expect(activeTariff).toContain('Supportive');
    },

    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
 
    fillCardNumber: async function(cardNumber, cardCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const paymentMethodModal = await $(this.paymentMethodModal);
        await expect(paymentMethodModal).toBeExisting();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.setValue(cardNumber);
        const codeField = await $(this.cardCodeField);
        await codeField.setValue(cardCode);
        await browser.keys('Tab');
        const linkButton = await $(this.linkButton);
        await linkButton.click();
        await paymentMethodModal.waitForDisplayed();
        const closeButton = await $(this.closeButton);
        await closeButton.click();
        //check that card was added
        const addedCard = await $(this.addedCard);
        await expect(addedCard).toBeExisting();
    },

    writeMessage: async function(message) {
        const messageField = await $(this.messageField);
        await messageField.setValue(message);
        //check that message was written
        await expect(messageField).toHaveValue(message);
    },

    orderBlanketAndHandkerchiefs: async function() {
        const orderBlanketButton = await $(this.orderBlanketButton);
        await orderBlanketButton.click();
        const orderBlanketSwitch = await $(this.orderBlanketSwitch);
        //check that Blanket and Handkerchiefs are added
        await browser.pause(1000);
        await expect(orderBlanketSwitch).toBeSelected();
    },

    orderTwoIceCreams: async function() {
        const addOneIceCream = await $(this.addOneIceCream);
        await addOneIceCream.click();
        await addOneIceCream.click();
        //check that 2 Ice Creams are added
        const addedIceCreams = await $(this.addedIceCreams);
        await expect(addedIceCreams).toBeExisting();
        const iceCreamValue = await addedIceCreams.getText();
        await expect(iceCreamValue).toBe('2');
    },

    orderTaxi: async function() {
        const orderButton = await $(this.orderButton);
        await expect(orderButton).toBeExisting();
        await orderButton.click();
        await browser.pause(1000);
        const carSearchModal = await $(this.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    },


}