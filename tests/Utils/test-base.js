const base = require("@playwright/test");

exports.customTest = base.test.extend(
{
        testDataForOrder:
        {
            username: "dontshakeit@gmail.com",
            password: "Jojobinx321",
            productName: "ZARA COAT 3"

        }

    }

)