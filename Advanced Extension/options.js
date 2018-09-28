function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    order_billing_name: document.querySelector("#order_billing_name").value,
    order_email: document.querySelector("#order_email").value,
    order_tel: document.querySelector("#order_tel").value,
    bo: document.querySelector("#bo").value,
    oba3: document.querySelector("#oba3").value,
    order_billing_address_3: document.querySelector("#order_billing_address_3").value,
    order_billing_city: document.querySelector("#order_billing_city").value,
    order_billing_zip: document.querySelector("#order_billing_zip").value,
    order_billing_country: document.querySelector("#order_billing_country").value,
    credit_card_type: document.querySelector("#credit_card_type").value,
    cnb: document.querySelector("#cnb").value,
    credit_card_month: document.querySelector("#credit_card_month").value,
    credit_card_year: document.querySelector("#credit_card_year").value,
    vval: document.querySelector("#vval").value,
    size: document.querySelector("#size").value,
    mode: document.querySelector("#mode").value,
    recaptcha: document.querySelector("#recaptcha").value,
    man_token: document.querySelector("#man_token").value 

  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#order_billing_name").value = result.order_billing_name || "";
    document.querySelector("#order_email").value = result.order_email || "";
    document.querySelector("#order_tel").value = result.order_tel || "";
    document.querySelector("#bo").value = result.bo || "";
    document.querySelector("#oba3").value = result.oba3 || "";
    document.querySelector("#order_billing_address_3").value = result.order_billing_address_3 || "";
    document.querySelector("#order_billing_city").value = result.order_billing_city || "";
    document.querySelector("#order_billing_zip").value = result.order_billing_zip || "";
    document.querySelector("#order_billing_country").value = result.order_billing_country || "GB";
    
    document.querySelector("#credit_card_type").value = result.credit_card_type || "visa";
    document.querySelector("#cnb").value = result.cnb || "";
    document.querySelector("#credit_card_month").value = result.credit_card_month || "04";
    document.querySelector("#credit_card_year").value = result.credit_card_year || "2017";
    document.querySelector("#vval").value = result.vval || "";
    document.querySelector("#size").value = result.size || "Large";
    document.querySelector("#mode").value = result.mode || "2";
    document.querySelector("#recaptcha").value = result.recaptcha || "";
    document.querySelector("#man_token").value = result.man_token || "false";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get(
    [
    "order_billing_name",
    "order_email",
    "order_tel",
    "bo",
    "oba3",
    "order_billing_address_3",
    "order_billing_city",
    "order_billing_zip",
    "order_billing_country",
    "credit_card_type",
    "cnb",
    "credit_card_month",
    "credit_card_year",
    "vval",
    "size",
    "mode",
    "recaptcha",
    "man_token"
    ]
  );
  
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);