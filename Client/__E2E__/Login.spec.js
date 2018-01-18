describe('Login', () => {
    beforeEach(async () => {
        await device.reloadReactNative();
    });
    
    it('should have welcome screen', async () => {
        await expect(element(by.id('LoginButton'))).toBeVisible();
    });
    
    it('should have a dialog after tap', async () => {
        await element(by.id('LoginButton')).tap();
    });

    it('should go through house sign up flow', async () => {
        await element(by.id('SignUpButton')).tap();
        await expect(element(by.text('Are you...'))).toBeVisible();   
        await element(by.id('HouseFlow')).tap();
        await expect(element(by.text('What would you like to share?'))).toBeVisible();
        await element(by.id('FBLogin')).tap();
    })


    it('should go through people sign up flow', async () => {
        await element(by.id('SignUpButton')).tap();
        await expect(element(by.text('Are you...'))).toBeVisible();   
        await element(by.id('PersonFlow')).tap();
        await expect(element(by.text('What would you like to share?'))).toBeVisible();
        await element(by.id('FBLogin')).tap();
    })
})