//const express = require('express');
//const app = express();
const Sequelize = require('sequelize');

const models = require('./models');
const Op = models.Sequelize.Op;
// Op is required to make operations in queries

// Let’s instead create a function that accepts an object 
// category and an array of object products. We want this 
// function to create a new row in the categories table in 
// our PostgreSQL database with the new category object, 
// while also creating new rows in the products table for 
// each product object in the product array. Of course, 
// this method should be called when every product in the 
// array corresponds to the category object that is being 
// passed.

// What this function does is to create a category with the data 
// the method receives, and save its newly generated id in catId. 
// Then, we map the array of products and create new rows in the 
// products table in the PostgreSQL database where we’ll also be 
// setting the product’sCategoryId corresponding to catId.

let createCatWithProds = async(catObj, prodArr) => {
    let catId = await models.Category.create({
        name: catObj.name,
        description:catObj.description
    }).then(cat => cat.id).catch(err => console.log(err));
    await prodArr.map(pr => {
        return models.Product.create({
            sku: pr.sku,
            name: pr.name,
            pr: pr.price,
            CategoryId:catId
        }).catch(err => console.log(err))
    });
  return;
};

let newCategory = {
    name: "Fantasy", 
    description:"Fantasy genre of the book"
};

let newProducts = [
    {
     sku: "nvw1",
     name: "Neverwhere",
     price: 10.99
    },
    {
     sku: "nrl2",
     name: "Northern Lights",
     price: 8.99    
}
];

createCatWithProds(newCategory, newProducts)