const controller = {};
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const { Product } = require("../models");

controller.getAllProducts = (req, res) => {
  let { search, categoryId, minPrice, maxPrice } = req.query;
  let products = Product;

  //Loc theo search
  if (search) {
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  //Loc theo categoryID
  if (categoryId) {
    if (isNaN(categoryId)) {
      throw new ApiError(400, "CategoryId phai la so");
    }
    categoryId = parseInt(categoryId);
    products = products.filter((product) => product.categoryId === categoryId);
  }

  //Loc theo gia
  if (minPrice) {
    if (isNaN(minPrice)) {
      throw new ApiError(400, "Min price phai la so thuc");
    }
    minPrice = parseFloat(minPrice);
    products = products.filter((product) => product.price >= minPrice);
  }

  //Loc theo gia
  if (maxPrice) {
    if (isNaN(maxPrice)) {
      throw new ApiError(400, "Max price phai la so thuc");
    }
    maxPrice = parseFloat(maxPrice);
    products = products.filter((product) => product.price <= maxPrice);
  }

  //Kiem tra xem co sp thoa dieu kien khong
  if (products.length === 0) {
    throw new ApiError(404, "Khong tim thay san pham");
  }

  //Tra ve ket qua
  const responseData = {
    products: products,
    filter: {
      search: search || "",
      categoryId: categoryId || null,
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
    },
  };

  res
    .status(200)
    .json(new ApiResponse(200, responseData, "Tim san pham thanh cong"));
};

controller.getProductById = (req, res) => {
  let { id } = req.params;

  let products = Product;
  if (isNaN(id)) {
    throw new ApiError(400, "Id phai la so nguyen");
  }
  id = parseInt(id);
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new ApiError(404, "Khong tim thay san pham");
  } else {
    res
      .status(200)
      .json(new ApiResponse(200, product, "Tim san pham thanh cong"));
  }
};

controller.createProduct = (req, res) => {
  const { name, description, price, categoryId } = req.body;
  if (!name || !description || !price || !categoryId) {
    throw new ApiError(400, "Thieu thuoc tinh nha");
  }
  if (isNaN(price)) {
    throw new ApiError(400, "Gia phai la so thuc");
  }
  if (isNaN(categoryId)) {
    throw new ApiError(400, "CategoryId phai la so nguyen");
  }
  const newProduct = {
    id: Product.length + 1,
    name,
    description,
    price,
    categoryId,
  };
  Product.push(newProduct);
  res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Them san pham thanh cong"));
};

controller.updateProduct = (req, res) => {
  let {id} = req.params;
  const { name, description, price, categoryId } = req.body;
  if (isNaN(id)) {
    throw new ApiError(400, "Id phai la so nguyen");
  }
  id = parseInt(id);
  const product = Product.find((product) => product.id === id);
  if (!product) {
    throw new ApiError(404, "Khong tim thay san pham");
    0;
  }
  if (name) {
    product.name = name;
  }
  if (description) {
    product.description = description;
  }
  if (categoryId) {
    product.categoryId = categoryId;
  }

  if (price) {
    if (isNaN(price)) {
      throw new ApiError(400, "Gia phai la so thuc");
    }
    product.price = price;
  }
  res.json(new ApiResponse(200, product, "Cap nhat san pham thanh cong"));
};

controller.deleteProduct = (req, res) => {
  let {id} = req.params;
  if(isNaN(id))
  {
    throw new ApiError(400,"Id phai la so nguyen");
  }
  id = parseInt(id);
  const index = Product.findIndex((product)=> product.id === id);
  if (index ===-1)
  {
    throw new ApiError(404, "khong tim thay san pham");
  }
  Product.splice(index,1);
  res.json(new ApiResponse(204, null, "Xoa san pham thanh cong"));

};

module.exports = controller;
