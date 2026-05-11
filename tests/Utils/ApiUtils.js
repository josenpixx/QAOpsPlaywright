class APIUtils
{

    async getToken()
    {
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
            data:loginPayload
        })// 200,201 and etc.
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);
        return token;
        }


}