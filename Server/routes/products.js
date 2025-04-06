const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const {
    createProduct, getProducts, updateProduct, deleteProduct
} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/', auth, getProducts);
router.post('/', auth, upload.single('image'), createProduct);
router.get('/:id', auth, updateProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
