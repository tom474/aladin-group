const express = require("express");
const app = express();
const port = 3000;
const bcrypt = require("bcryptjs");
const fileUpload = require('express-fileupload');
const schema = require("./model/schema");
const User = schema.User;
const Customer = schema.Customer;
const Vendor = schema.Vendor;
const Shipper = schema.Shipper;
const Product = schema.Product;
const Order = schema.Order;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());

// Use the `express.urlencoded` middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));

// Route for login page. Users have to log in to use the website
app.get("/", (req, res) => {
    res.render("login-page");
});

// Route for Vendor registration page
app.get("/vendor/register", (req, res) => {
    res.render("register-vendor");
});

// Route for Customer registration page
app.get("/customer/register", (req, res) => {
    res.render("register-customer");
});

// Route for Shipper registration page
app.get("/shipper/register", (req, res) => {
    res.render("register-shipper");
});

// Route for Vendor homepage
app.get("/vendor/homepage/:id", (req, res) => {
    const products = Product.find();
    const orders = Order.find();
    const user = User.findById(req.params.id);
    Promise.all([products, user, orders])
        .then(([products, user, orders]) =>
            res.render("homepage-vendor", { products, orders, user })
        )
        .catch((error) => res.send(error));
});

// Route for To-do list



// khai start
//Route for Product form
// Route for adding new products

app.post("/vendor/products/add", (req, res) => {
    const vendorId = req.body.vendorId;
    delete req.body.vendorId;
    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.redirect(`/vendor/homepage/${vendorId}`);
        })
        .catch((error) => res.send(error));
});
app.get('/vendor/products/delete/:pid/:uid', (req,res) => {
    Product.findByIdAndDelete(req.params.pid)
    .then(() => {
        res.redirect(`/vendor/homepage/${req.params.uid}`);
    })
    .catch((error) => res.send(error));
})
// khai end

// Route for Customer homepage
app.get("/customer/homepage", (req, res) => {
    const products = Product.find();

    // Retrieve all categories from the database
    const categories = Product.distinct("category");

    // Wait for both promises to resolve before rendering the homepage
    Promise.all([products, categories])
        .then(([products, categories]) => {
            res.render("homepage-customer", { products, categories });
        })
        .catch((error) => {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        });
});

// Route for category page
app.get("/customer/category-page", (req, res) => {
    res.render("category-page");
});

// Route for product detail page
app.get("/customer/product-detail-page", (req, res) => {
    res.render("product-detail-page");
});

// Route for shopping cart page
app.get("/customer/shopping-cart-page", (req, res) => {
    res.render("shopping-cart-page");
});

// Route for Shipper homepage
app.get("/shipper/homepage/:id", (req, res) => {
    const products = Product.find();
    const orders = Order.find();
    const user = User.findById(req.params.id);
    Promise.all([products, user, orders])
        .then(([products, user, orders]) =>
            res.render("homepage-shipper", { products, orders, user })
        )
        .catch((error) => res.send(error));
});

app.post("/shipper/homepage/update/", (req, res) => {
    Order.findOneAndUpdate(
        { _id: req.body.oid },
        { status: req.body.status },
        { new: true }
      )
      .then(() => {
        console.log('The order is updated');
        res.redirect(`/shipper/homepage/${req.body.uid}`);
      })
      .catch((error) => console.log(error.message));
});

// Route for handling Vendor registration form submission
app.post("/vendor/register", async (req, res) => {
    try {
        const {
            username,
            password,
            profilePicture,
            email,
            terms,
            businessName,
            businessAddress,
        } = req.body;

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                error: "Username is already taken",
                message:
                    "You should go back to the register page and sign up with a different Username",
            });
        }

        const existingBusinessName = await Vendor.findOne({ businessName });
        if (existingBusinessName) {
            return res.status(409).json({
                error: "Business Name is already taken",
                message:
                    "You should go back to the register page and sign up with a different Business Name",
            });
        }

        const existingBusinessAddress = await Vendor.findOne({
            businessAddress,
        });
        if (existingBusinessAddress) {
            return res.status(409).json({
                error: "Business Address is already taken",
                message:
                    "You should go back to the register page and sign up with a different Business Address",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Vendor document and save to database
        const newVendor = new Vendor({
            username,
            password: hashedPassword,
            profilePicture,
            email,
            terms,
            businessName,
            businessAddress,
        });
        await newVendor.save();

        // Redirect to Vendor homepage
        const id = newVendor._id;
        res.redirect(`/vendor/homepage/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route for handling Customer registration form submission
app.post("/customer/register", async (req, res) => {
    try {
        const {
            username,
            password,
            profilePicture,
            email,
            terms,
            name,
            address,
        } = req.body;

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                error: "Username is already taken",
                message:
                    "You should go back to the register page and sign up with a different Username",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Customer document and save to database
        const newCustomer = new Customer({
            username,
            password: hashedPassword,
            profilePicture,
            email,
            terms,
            name,
            address,
        });
        await newCustomer.save();

        // Redirect to Customer homepage
        const id = newCustomer._id;
        res.redirect(`/customer/homepage/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route for handling Shipper registration form submission
app.post("/shipper/register", async (req, res) => {
    try {
        const {
            username,
            password,
            profilePicture,
            name,
            email,
            terms,
            distributionHub,
        } = req.body;

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                error: "Username is already taken",
                message:
                    "You should go back to the register page and sign up with a different Username",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Shipper document and save to database
        const newShipper = new Shipper({
            username,
            password: hashedPassword,
            profilePicture: {
                data: req.files.profilePicture.data,
                mimeType: req.files.profilePicture.mimetype
            },
            name,
            email,
            terms,
            distributionHub,
        });
        await newShipper.save();

        // Redirect to Shipper homepage
        const id = newShipper._id;
        res.redirect(`/shipper/homepage/${id}`); // replace with your Shipper homepage URL
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user with the given username
        const user = await User.findOne({ username });

        // If user not found, show error message
        if (!user) {
            return res.render("login-page", {
                error: "Invalid username or password",
            });
        }

        // Compare the hashed password with the input password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If password doesn't match, show error message
        if (!passwordMatch) {
            return res.render("login-page", {
                error: "Invalid username or password",
            });
        }

        // If login successful, redirect to the user's respective homepage
        if (user.__t === "Vendor") {
            const id = user._id;
            res.redirect(`/vendor/homepage/${id}`);
        } else if (user.__t === "Customer") {
            const id = user._id;
            res.redirect(`/customer/homepage/${id}`);
        } else if (user.__t === "Shipper") {
            const id = user._id;
            res.redirect(`/shipper/homepage/${id}`);
        } else {
            res.status(500).json({ error: "Invalid user role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to category page
app.get("/customer/category/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category: category });
        res.render("category-page", { category: category, products: products });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});
// Route to detail product page
app.get("/customer/products/:id", async (req, res) => {
    Product.findById(req.params.id).then((product) => {
        if (!product) {
            return res.send("Can't find that ID");
        }
        res.render("product-detail-page", { product: product });
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
