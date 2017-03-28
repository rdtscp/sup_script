**Disclaimer** 
*I am in now way responsible for the consequences of using this extension. It is still experimental and not robust. That said I use it myself with confidence and it has been through some testing.*

### **Supreme auto-checkout Chrome Extension** ###

* Chrome Extension to simulate one click checkout on supremenewyork
* Version 1.1

### Set Up. ###

* Firstly, set up your machine to be able to host an Apache server using an application like MAMP or XAMPP.
* Place the "checkout.php" file into the htdocs folder of XAMPP.
* In google chrome, go to Settings > Extensions and check "Developer Mode".
* Then click "Load unpacked extension..." and select the root directory of this repo(by default the folder should be called sup_script).
* Remember to uncheck "Enabled" if you don't want to auto checkout anything you visit on supremes website.
* Enter your preferences in the "content.js" file.
* Don't edit the code. Only edit where told.
* Instructions in the code for where to enter your details.
* Only preferences at the moment are desired size, and 'mode'.
* Desired size means it will only check out that size.

### Drop Day Instructions. ###

* **[WARNING] Version 1.1 has not been tested with real credentials, so could either not work, or work incorrectly. Use at your own risk. [WARNING]**
* Make sure all of "Set Up" has been completed, and that you can access checkout.php
* No earlier than 2 minutes before the drop, go to checkout.php, and use the "Update Extension Filepath" button to enter the filepath of the root directory of the extension folder. For example: C:\Users\JohnSmith\Documents\sup_script
* Then complete a captcha, and click "Transfer Google Captcha Token"
* This will grant you ONE cart checkout for roughly a two minute window.
* The next step is to make sure that the script is enabled and your correct details are stored in the script.
* Refresh supremenewyork.com/shop/all at 11:00am and click on the product you want. If you know the product wont be available in the Size you specified earlier, then you will have to manually click "Add to Cart", and then the script will take over. Else the script will cart your desired size and continue to checkout.

# Modes #
* [0] Drop day - script will only checkout item if its past 11:00:03am.
* [1] Restock mode [BROKEN]- If on a product page of a sold out item, script will continually refresh until a size becomes available, and then checkout instantly. (With the inclusion of a captcha on their site, autocheckout upon product restock cannot be done without completing a captcha).