const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');


exports.createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, category, manufactureDate } = req.body;
        const file = req.file;

        if (!name || !price || !stock || !description || !category || !manufactureDate || !file) {
            return res.status(400).json({ message: 'All fields including image are required.' });
        }

        const imageBuffer = fs.readFileSync(path.join(__dirname, '../uploads/', file.filename));
        const imageType = file.mimetype;

        const product = new Product({
            name,
            price,
            stock,
            description,
            category,
            manufactureDate,
            image: file.filename,
            imageBuffer,
            imageType
        });

        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.error('[CREATE PRODUCT ERROR]', err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};



exports.getProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        const allowedSortFields = ['name', 'category', 'price', 'createdAt'];
        const sortField = allowedSortFields.includes(req.query.sortField) ? req.query.sortField : 'createdAt';

        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { category: { $regex: search, $options: 'i' } },
                ]
            }
            : {};

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort({ [sortField]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            products,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error('[GET PRODUCTS ERROR]', err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
};



exports.updateProduct = async (req, res) => {
    console.log('[UPDATE PRODUCT] Request received');

    const productId = req.params.id;
    const updatedData = req.body;

    console.log(`[UPDATE PRODUCT] Product ID: ${productId}`);
    console.log('[UPDATE PRODUCT] Updated Data:', updatedData);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

        if (!updatedProduct) {
            console.warn('[UPDATE PRODUCT] Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('[UPDATE PRODUCT] Successfully updated product:', updatedProduct);
        res.json(updatedProduct);
    } catch (err) {
        console.error('[UPDATE PRODUCT ERROR]', err);
        res.status(500).json({ message: 'Failed to update product' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        console.error('[DELETE PRODUCT ERROR]', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
