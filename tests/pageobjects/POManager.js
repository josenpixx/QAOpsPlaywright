const {LoginPage} = require("./loginPage");
const {DashBoardPage} = require("./DashBoardPage");
const {CreateOrder} = require("./createOrder");
const {FindOrder} = require("./findOrder");

class POManager
{
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.createOrder = new CreateOrder(this.page);
        this.findOrder = new FindOrder(this.page);
    }
    

getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashBoardPage;
}

getCreateOrder()
{
   return this.createOrder;
}

getFindOrder()
{
    return this.findOrder;
}
};

module.exports = {POManager};