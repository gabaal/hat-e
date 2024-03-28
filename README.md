
# Hat-e App
A e-commerce shop for hats.
## User Stories
[x] As a user I want to view all products

[x] As a user I want to click a product which will take me to a single product page

[x] As a user I want to be able to add a product to my cart

[x] As a user I want an about me page

[x] As a user I want to be able to sort the products by price, name etc

[x] As a user I want to be able to edit my products when it the shopping cart

[x] As a user I want to be able to add a review to a product


## Snipcart
Snipcart is used for the basket, payments and products.
Snipcart works with a static products.json file. To do this everytime the shop page is reloaded a function runs to get the products and related reviews and pass this as json to the proucts.json file.
/shop calls GetProductsAndReviewsAvg() from the , which calls 
