const { defineConfig } = require("cypress");
module.exports = defineConfig({
  env: {
    baseUrl: "https://staging.circlepay.ai/",
    merchantNumber: "+923244323448",
    password: "Admin125!@%",
    customerNumber: "+923244323448",
    item: "Item",
    quantity: "5",
    price: "5",
    tax: "5",
    shipping: "5",
    token: "",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
