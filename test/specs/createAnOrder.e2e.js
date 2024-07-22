const page = require('../../page.js');
const helper = require('../../helper.js')

describe('Create an order', () => {
    it('should add the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })   

    it('should choose supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const activeTariff = await $(page.activeTariff).getText();
        await expect(activeTariff).toContain('Supportive');
        })

    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should add a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.fillCardNumber(cardNumber, cardCode);
        const addedCard = await $(page.addedCard);
        await expect(addedCard).toBeExisting();
    })

   it('should write a message to the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.writeMessage('Bring me a pint of beer!');
        const messageField = await $(page.messageField);
        await expect(messageField).toHaveValue('Bring me a pint of beer!');
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        await page.orderBlanketAndHandkerchiefs();
        const orderBlanketSwitch = await $(page.orderBlanketSwitch);
        await expect(orderBlanketSwitch).toBeSelected();
    })

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        await page.orderTwoIceCreams();
        const addedIceCreams = await $(page.addedIceCreams);
        await expect(addedIceCreams).toBeExisting();
        const iceCreamValue = await addedIceCreams.getText();
        await expect(iceCreamValue).toBe('2');
    })

    it('should check that the car search modal appears', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.fillCardNumber(cardNumber, cardCode);
        await page.writeMessage('Bring me a pint of beer!');
        await page.orderBlanketAndHandkerchiefs();
        await page.orderTwoIceCreams();
        await page.orderTaxi();
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeExisting();
    })    

    it('should check for the driver info to appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.chooseSupportivePlan();
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.fillCardNumber(cardNumber, cardCode);
        await page.writeMessage('Bring me a pint of beer!');
        await page.orderBlanketAndHandkerchiefs();
        await page.orderTwoIceCreams();
        await page.orderTaxi();
        await browser.pause (38000);
        const driverArriving = await $(page.driverArriving).getText();
        await expect(driverArriving).toContain('The driver will arrive');
    })  

})

