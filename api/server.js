import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorLog, errorHandler } from "./middleware/errorHandler.js";

//Inicialization
const app = express();
dotenv.config();

//Other imports
import mongoConnect from "./config/mongoConnect.js";
import authRoutes from "./modules/auth/infraestructure/input_adapters/authRoutes.js";
import userRoutes from "./modules/user/infraestructure/input_adapters/userRoutes.js";
import imagesRoutes from "./modules/images/infraestructure/input_adapters/imageRoutes.js";
import productRoutes from "./modules/product/infraestructure/input_adapters/productRoutes.js";
import categoryRoutes from "./modules/category/infraestructure/input_adapters/categoryRoutes.js";
import subCategoryRoutes from "./modules/subcategory/infraestructure/input_adapters/subcategoryRoutes.js";

/** esta es la que vale */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*"); // Reemplaza con el origen de tu aplicación React
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Platform');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});



/**Middleware */
app.use(express.json());
app.use(cookieParser());

//Index routes
app.use(authRoutes);
app.use(userRoutes);
app.use(imagesRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
app.use(subCategoryRoutes);

//ErrorHandler
app.use(errorLog);
app.use(errorHandler);

//Running server
var server = app.listen(process.env.PORT || 8000, () => {
  mongoConnect();
  console.log("express server listening on port " + server.address().port);
});

/**
 * const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

async function createData() {
  // Crear un usuario
  const user = new User({ name: 'Alice', email: 'alice@example.com' });
  await user.save();

  // Crear una categoría
  const electronics = new Category({ name: 'Electronics' });
  await electronics.save();

  // Crear una subcategoría para la categoría 'Electronics'
  const mobiles = new Subcategory({ name: 'Mobile Phones', category: electronics._id });
  await mobiles.save();

  // Crear productos para la subcategoría 'Mobile Phones' creados por 'Alice'
  const product1 = new Product({ name: 'iPhone 12', price: 999, subcategory: mobiles._id, createdBy: user._id });
  const product2 = new Product({ name: 'Samsung Galaxy S21', price: 799, subcategory: mobiles._id, createdBy: user._id });

  await product1.save();
  await product2.save();
}

createData();

async function getSubcategories(categoryId) {
  const subcategories = await Subcategory.find({ category: categoryId }).exec();
  console.log(subcategories);
}

getSubcategories(electronics._id); // Reemplaza electronics._id con el ID de la categoría deseada

async function getProducts(subcategoryId) {
  const products = await Product.find({ subcategory: subcategoryId }).populate('createdBy').exec();
  console.log(products);
}

getProducts(mobiles._id); // Reemplaza mobiles._id con el ID de la subcategoría deseada

async function getProductWithUser(productId) {
  const product = await Product.findById(productId).populate('createdBy').exec();
  console.log(product);
}

getProductWithUser(product1._id); // Reemplaza product1._id con el ID del producto deseado

async function listCategoriesAndSubcategoriesAndProducts() {
  // Obtener todas las categorías
  const categories = await Category.find().exec();
  for (let category of categories) {
    console.log(`Category: ${category.name}`);
    
    // Obtener las subcategorías para cada categoría
    const subcategories = await Subcategory.find({ category: category._id }).exec();
    for (let subcategory of subcategories) {
      console.log(`  Subcategory: ${subcategory.name}`);
      
      // Obtener los productos para cada subcategoría y los usuarios que los crearon
      const products = await Product.find({ subcategory: subcategory._id }).populate('createdBy').exec();
      for (let product of products) {
        console.log(`    Product: ${product.name}, Price: ${product.price}, Created by: ${product.createdBy.name}`);
      }
    }
  }
}

listCategoriesAndSubcategoriesAndProducts();

 */
