class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signInbutton = page.getByRole('button', {name: 'Login'});
        this.userName = page.getByPlaceholder('email@example.com');
        this.password = page.getByPlaceholder("enter your passsword");
    }

async goTo(){
    await this.page.goto("https://rahulshettyacademy.com/client/");
}

async validLogin(username, password )
{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');
}
}

module.exports = {LoginPage};