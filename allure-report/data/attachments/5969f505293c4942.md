# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UIBasics.spec.js >> UI Controls
- Location: tests/UIBasics.spec.js:44:1

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.click: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('#terms')
    - locator resolved to <input id="terms" name="terms" type="checkbox"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    76 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div id="myModal" class="modal fade show">…</div> intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - link "Free Access to InterviewQues/ResumeAssistance/Material" [ref=e3] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/documents-request
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e4] [cursor=pointer]:
      - /url: https://techsmarthire.com/
  - generic [ref=e5]:
    - heading [level=3] [ref=e6]:
      - img [ref=e8]
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]: "Username:"
        - textbox "Username:" [ref=e17]
      - generic [ref=e18]:
        - generic [ref=e19]: "Password:"
        - textbox "Password:" [ref=e20]
      - generic [ref=e22]:
        - generic [ref=e23] [cursor=pointer]:
          - text: Admin
          - radio "Admin" [ref=e24]
        - generic [ref=e26] [cursor=pointer]:
          - text: User
          - radio "User" [checked] [ref=e27]
      - combobox [ref=e30]:
        - option "Student"
        - option "Teacher"
        - option "Consultant" [selected]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - checkbox "I Agree to the terms and conditions" [ref=e34]
          - generic [ref=e35]:
            - text: I Agree to the
            - link "terms and conditions" [ref=e36] [cursor=pointer]:
              - /url: "#"
        - button "Sign In" [ref=e37] [cursor=pointer]
      - paragraph [ref=e39]:
        - text: (username is
        - generic [ref=e40]: rahulshettyacademy
        - text: and Password is
        - generic [ref=e41]: Learning@830$3mK2
        - text: )
  - generic [ref=e43]:
    - paragraph [ref=e45]: You will be limited to only fewer functionalities of the app. Proceed?
    - generic [ref=e46]:
      - button "Cancel" [ref=e47] [cursor=pointer]
      - button "Okay" [active] [ref=e48] [cursor=pointer]
```

# Test source

```ts
  1  | const {test, expect} = require("@playwright/test");
  2  | 
  3  | test.describe.configure({mode: 'serial'}) //выполнение тестов в одном браузере, по порядку, без перезапуска страницы    
  4  | test('Browser Context Playwright test', async ({browser})=>
  5  | {
  6  | //playwright code here
  7  | // chrome - plugins/ cookies
  8  |     
  9  |     const context = await browser.newContext();
  10 |     const page = await context.newPage();
  11 |     //page.route('**/*.css', route=> route.abort());
  12 |     const userName = page.locator('#username');
  13 |     const signIn = page.locator('#signInBtn');
  14 |     const cardTitles = page.locator(".card-body a")
  15 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  16 |     console.log(await page.title());
  17 |     //css xpath
  18 |     await userName.fill("rahulshetty");
  19 |     await page.locator("[type='password']").fill('Learning@830$3mK2');
  20 |     await signIn.click();
  21 |     console.log(await page.locator("[style*='block']").textContent());
  22 |     await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  23 |     // type - fill
  24 |     await userName.fill("");
  25 |     await userName.fill("rahulshettyacademy");
  26 |     await signIn.click();
  27 |     console.log(await cardTitles.first().textContent());
  28 |     console.log(await cardTitles.nth(2).textContent());
  29 |     const allTitles = await cardTitles.allTextContents();
  30 |     console.log(allTitles);
  31 | });
  32 | 
  33 | test('Page context Playwright test', async ({page})=>
  34 | {
  35 | //playwright code here
  36 | // chrome - plugins/ cookies
  37 |     await page.goto("https://google.com");
  38 |     //get title assertion
  39 |     console.log(await page.title());
  40 |     await expect(page).toHaveTitle("Google");
  41 | });
  42 | 
  43 | 
  44 | test('UI Controls', async ({page})=>
  45 | {
  46 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  47 |     const userName = page.locator('#username');
  48 |     const signIn = page.locator("#signInBtn");
  49 |     const documentLink = page.locator("[href*='documents-request']");
  50 |     const dropdown = page.locator("select.form-control");
  51 |     await dropdown.selectOption("consult");
  52 |     await page.locator('.radiotextsty').last().click();
  53 |     await page.locator('#okayBtn').click();
  54 |     console.log(await page.locator(".radiotextsty").last().isChecked());
  55 |     await expect(page.locator(".radiotextsty").last()).toBeChecked();
> 56 |     await page.locator("#terms").click();
     |                                  ^ Error: locator.click: Test timeout of 40000ms exceeded.
  57 |     await expect(page.locator("#terms")).toBeChecked();
  58 |     await page.locator("#terms").uncheck();
  59 |     expect(await page.locator("#terms").isChecked()).toBeFalsy();
  60 |     //await page.pause();  
  61 |     await expect(documentLink).toHaveAttribute('class','blinkingText');
  62 | });   
  63 | 
  64 | test('Child window hadl', async ({browser})=>
  65 | {
  66 |     
  67 |     const context = await browser.newContext();
  68 |     const page = await context.newPage();
  69 |     const userName = page.locator('#username');
  70 |     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  71 |     const documentLink = page.locator("[href*='documents-request']");
  72 |     
  73 |     const [newPage] = await Promise.all([
  74 | 
  75 |         context.waitForEvent('page'), //listen for any new pages opened in background
  76 |         documentLink.click(),  // new page is opening
  77 |     ])
  78 | 
  79 |     const text = await newPage.locator(".red").textContent();
  80 |     const arrayText = text.split("@");
  81 |     const domain = arrayText[1].split(" ")[0];
  82 |     await page.locator("#username").fill(domain);
  83 |     console.log(await userName.inputValue());
  84 | })
```