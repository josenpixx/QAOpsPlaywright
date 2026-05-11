import {LoginPage} from './loginPage';
import {DashBoardPage} from './DashBoardPage';
import {CreateOrder} from './createOrder';
import {FindOrder} from './findOrder';
import {Page} from '@playwright/test';

export class POManager
{   
    page: Page;
    loginPage:LoginPage;
    dashBoardPage:DashBoardPage;
    createOrder:CreateOrder;
    findOrder:FindOrder;

    constructor(page:any){
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