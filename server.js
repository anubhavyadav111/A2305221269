require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 9876;

const eCommCompanies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

const token = process.env.TOKEN;

const fetchProducts = async (company, category, minPrice, maxPrice) => {
  const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
    params: {
      minPrice,
      maxPrice,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

app.get('/categories/:categoryname/products', async (req, res) => {
  const { categoryname } = req.params;
  const { company, top = 10, minPrice = 0, maxPrice = Number.MAX_SAFE_INTEGER, sort = 'price', order = 'asc', page = 1 } = req.query;

  if (!eCommCompanies.includes(company)) {
    return res.status(400).json({ error: 'Invalid company name' });
  }

  if (!categories.includes(categoryname)) {
    return res.status(400).json({ error: 'Invalid category name' });
  }

  try {
    let products = await fetchProducts(company, categoryname, minPrice, maxPrice);

    products = products.map(product => ({
      ...product,
      uniqueId: uuidv4(),
    }));

    products.sort((a, b) => (order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]));

    const startIndex = (page - 1) * top;
    const endIndex = startIndex + top;
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/categories/:categoryname/products/:productid', async (req, res) => {
  const { categoryname, productid } = req.params;

  try {
    const productDetails = await fetchProductDetails(categoryname, productid);
    res.json(productDetails.data.product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});

const fetchProductDetails = async (category, productId) => {
  const responses = await Promise.all(eCommCompanies.map(company =>
    axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  ));
  return responses.find(response => response.data.product);
};

app.listen(port, () => {
  console.log(`Top Products Microservice running at http://localhost:${port}`);
});
