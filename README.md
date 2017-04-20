**Disclaimer** 
*I am in now way responsible for the consequences of using this extension. It is still experimental and not robust. That said I use it myself with confidence and it has been through some testing.*

# **Supreme auto-checkout Firefox/Chrome Extension**

* Firefox/Chrome Extension to simulate one click add-to-cart/checkout on supremenewyork
* Version 2.0
* Overview of what script is doing can be seen by viewing webpage console.

## Simple Extension

### Overview

This extension is for Firefox **only** . It will save your auto-fill details, and upon clicking on a product, it will add the desired size to cart take user to the checkout page, and autofill details.

### Installation/Set-Up

1. First open Firefox and go to the URL: "about:debugging".

2. Click "Load Temporary Add-on", and navigate to the *Simple Extension* folder inside this repo.

3. Select any file and click "Open".

4. The extension is now loaded into Firefox and will be running. To change settings go to the URL: "about:addons".

5. Under the Extension listing, click "Options".

6. Enter your details and press "Save".

7. Now if you click on a product on supreme's webstore, it will add to cart in specified size and take you to the checkout page and autofill your details.


## Advanced Extension

### Overview

* This extension requires more experience and knowledge of computing to use
* Complete_checkout has not been extensively tested for this extension

This extension can be used in either Firefox or Chrome. It will save your auto-fill details, and upon clicking on a product it will add the desired size to cart, and take the user to the checkout page. With complete_checkout/captcha bypass enabled, the script can also bypass captcha and complete the order automatically. This extension is significantly quicker/more efficient at adding to cart and autofilling.

### Installation/Set-Up

1. First open Firefox and go to the URL: "about:debugging" [OR] Open Chrome and go to the URL: "chrome://extensions/".

2. In Firefox click "Load Temporary Add-on", and navigate to the *Simple Extension* folder inside this repo [OR] In Chrome click "Developer mode" and click "Load unpacked extension..." and navigate to the *Simple Extension* folder inside this repo.

3. In Firefox, select any file in the folder and click "Open" [OR] In Chrome just select the "Advanced Extension" folder and click "OK".

4. The extension is now loaded into Firefox/Chrome and will be running.

5. In order to enter your autofill details and change settings, you must host an Apache server on your machine in order to access the settings webpage.

6. Once you have an Apache server running, place the "checkout.php" and "savedata.php" files into the htdocs folder of your Apache application.

7. Change your hosts file to include the mapping of 127.0.0.1 to dev.supremenewyork.com

8. Access "dev.supremenewyork.com/checkout.php" to change settings and get further instructions for use.
 
###Note###
* Do not use both extensions at the same time.
* A captcha response is only valid for **one** cart checkout.