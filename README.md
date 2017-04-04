**Disclaimer** 
*I am in now way responsible for the consequences of using this extension. It is still experimental and not robust. That said I use it myself with confidence and it has been through some testing.*

# **Supreme auto-checkout Firefox Extension(Chrome not supported in v1.2)** #

* Firefox Extension to simulate one click checkout on supremenewyork
* Version 1.2 **VERSION 1.2 HAS NOT BEEN TESTED IN REAL CONDITIONS YET, USE AT YOUR OWN RISK**

### Set Up. ###

1. Firstly, set up your machine to be able to host an Apache server using an application like MAMP or XAMPP.
2. Place the "checkout.php" file into the htdocs folder of XAMPP.
3. Edit your hosts file to map '127.0.0.1' to 'dev.supremenewyork.com'.
3. In firefox, go to "about:debugging" and click "Load Temporary Add-on".
4. Then click any file in the directory of this repo(by default the root folder should be called sup_script).
5. Go to "about:addons", and under the add-on, click "Options" to access option menu.
7. Don't edit the code.
8. Desired size means it will only check out that size.

# Drop Day Instructions. #

* **[WARNING] Version 1.2 has not been tested with real credentials, so could either not work, or work incorrectly. Use at your own risk. [WARNING]**

## Manual Captcha Setting ##
1. In the Firefox add-on settings, you can set "Use Above Token" to 'true' and press "Save", to enter your desired re-captcha response token.
2. Upon visiting "dev.supremenewyork.com/checkout.php" you will simply complete a captcha(no earlier than 2 minutes before drop).
3. Copy the response that is displayed in the text box, and enter it into the "Google Captcha Token" field on the add-on options and press "Save".

## Auto Captcha Setting ##
1. In the Firefox add-on settings, you can set "Use Above Token" to 'false' and press "Save", to have the captcha field populated automatically.
2. Upon visiting "dev.supremenewyork.com/checkout.php" you will have to enter the filepath to the root directory of the add on folder using "Update Extension Filepath" button.
3. Complete a captcha no earlier than 2 minutes prior to the drop, and use the add-on as per usual.

# Modes #
* [0] Complete Checkout - Script will attempt to checkout an item fully for you.
* [1] Go to Cart (with Captcha) - Script will take you to the checkout page, and replace the captcha response input on the checkout form, but **will not** complete checkout.
* [2] Go to Cart (without Captcha) - Script will take you to checkout page, but you will be required to complete a captcha to checkout as the script will only attempt to autofill your details.