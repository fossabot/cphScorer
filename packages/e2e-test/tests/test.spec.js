const url = "http://localhost:1234/"

describe('CPH Scorer', () => {

    before((browser) => {
        browser
            .useXpath()
            .url(url)
            .waitForElementVisible("//body")
    })

    test('Register player', (browser) => {
        browser
            .click("//input[@id='playerList']")
            .waitForElementPresent("//option[@value='player0 - player0']")
            .setValue("//input[@id='playerList']", "player0 - player0")
            .click("//input[@id='VET']")
            .click("//button[@data-e2e-valid-register]")
            .waitForElementPresent("//li[text()='player0 - player0']")
    })

    test('Register new player', (browser) => {
        browser
            .setValue("//input[@id='playerList']", "test")
            .click("//input[@id='VET']")
            .click("//button[@data-e2e-valid-register]")
            .waitForElementVisible("//div[contains(@class,'js-modal-add')]")
            .setValue("//input[@id='firstName']", "test")
            .setValue("//input[@id='lastName']", "test")
            .click("//button[@data-e2e-valid-modal]")
            .waitForElementPresent("//li[text()='test - test']")
            .url(url)
    })

    test('Launch tournament', (browser) => {
        browser
            .click("//input[@id='VET']")
            .setValue("//input[@id='playerList']", "player1 - player1")
            .click("//button[@data-e2e-valid-register]")
            .setValue("//input[@id='playerList']", "player2 - player2")
            .click("//button[@data-e2e-valid-register]")
            .click("//button[text()='Lancer le concours']")
            .pause(1000)
            .click("//a[text()='Parties']")
            .waitForElementVisible("//body")
            .waitForElementVisible("//div[@class='match']")
    })

    test('Load ranking', (browser) => {
        const date = new Date().toLocaleDateString()

        browser
            .click("//a[text()='Classement']")
            .waitForElementVisible("//body")
            .waitForElementPresent(`//h1[text()='Classement concours SEN au ${date}']`)
            .waitForElementVisible("//table")
            .click("//button[text()='VET']")
            .waitForElementPresent(`//h1[text()='Classement concours VET au ${date}']`)
            .waitForElementVisible("//table")
            .waitForElementVisible("//td[text()='test - test']")
            .waitForElementVisible("//td[text()='player0 - player0']")
            .waitForElementVisible("//td[text()='player1 - player1']")
            .waitForElementVisible("//td[text()='player2 - player2']")
    })

    after((browser) => { browser.end() })
})