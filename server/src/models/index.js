const models = {};

const categories = [
    {id: 1, name: 'Electronics'},
    {id: 2, name: 'Books'},
    {id: 3, name: 'Clothing'},      
]

const product = [
    {id: 1, name: 'Laptop', categoryId: 1, description: "DIen khung", price: 2000},
     {id: 2, name: 'dien', categoryId: 2, description: "khung", price: 1000},

]

models.Categories = categories;
models.Product = product;

module.exports = models;