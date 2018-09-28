const saveOptions = (e) => {
  e.preventDefault();
  chrome.storage.local.set({'autofill': {
    order_billing_name:       document.querySelector("#order_billing_name").value,
    order_email:              document.querySelector("#order_email").value,
    order_tel:                document.querySelector("#order_tel").value,
    bo:                       document.querySelector("#bo").value,
    oba3:                     document.querySelector("#oba3").value,
    order_billing_address_3:  document.querySelector("#order_billing_address_3").value,
    order_billing_city:       document.querySelector("#order_billing_city").value,
    order_billing_zip:        document.querySelector("#order_billing_zip").value,
    order_billing_country:    document.querySelector("#order_billing_country").value,
    credit_card_type:         document.querySelector("#credit_card_type").value,
    cnb:                      document.querySelector("#cnb").value,
    credit_card_month:        document.querySelector("#credit_card_month").value,
    credit_card_year:         document.querySelector("#credit_card_year").value,
    vval:                     document.querySelector("#vval").value,
    size:                     document.querySelector("#size").value
  }});
};

const setCurrentChoice = (config) => {
  document.querySelector("#order_billing_name").value       = config.order_billing_name || "";
  document.querySelector("#order_email").value              = config.order_email || "";
  document.querySelector("#order_tel").value                = config.order_tel || "";
  document.querySelector("#bo").value                       = config.bo || "";
  document.querySelector("#oba3").value                     = config.oba3 || "";
  document.querySelector("#order_billing_address_3").value  = config.order_billing_address_3 || "";
  document.querySelector("#order_billing_city").value       = config.order_billing_city || "";
  document.querySelector("#order_billing_zip").value        = config.order_billing_zip || "";
  document.querySelector("#order_billing_country").value    = config.order_billing_country || "GB";

  document.querySelector("#credit_card_type").value         = config.credit_card_type || "visa";
  document.querySelector("#cnb").value                      = config.cnb || "";
  document.querySelector("#credit_card_month").value        = config.credit_card_month || "04";
  document.querySelector("#credit_card_year").value         = config.credit_card_year || "2017";
  document.querySelector("#vval").value                     = config.vval || "";
  document.querySelector("#size").value                     = config.size || "Large";
};

document.addEventListener("DOMContentLoaded", chrome.storage.local.get(['autofill'], setCurrentChoice));
document.querySelector("form").addEventListener("submit", saveOptions);