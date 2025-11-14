
const express = require('express');
const { Favorite } = require('../database/models');
const { verifyToken } = require('../utils/token');

const router = express.Router();


router.get('/', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      where: { user_id: req.userId },
      attributes: ['product_id'],
    });

    const productIds = favorites.map(fav => fav.product_id);

    res.status(200).json({
      success: true,
      message: 'Favorites retrieved successfully',
      data: productIds,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving favorites',
      data: error.message,
    });
  }
});

/**
 * POST /favorites/:productId
 * Adaugă un produs la favoritele userului logat
 */
router.post('/:productId', verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, message: 'Product id is not valid', data: {} });
    }

    // verificăm dacă produsul e deja în favorite
    const existing = await Favorite.findOne({
      where: { user_id: req.userId, product_id: productId },
    });

    if (existing) {
      return res.status(200).json({ success: true, message: 'Product already in favorites', data: existing });
    }

    const favorite = await Favorite.create({
      user_id: req.userId,
      product_id: productId,
    });

    res.status(201).json({ success: true, message: 'Product added to favorites', data: favorite });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding favorite', data: error.message });
  }
});

/**
 * DELETE /favorites/:productId
 * Șterge produsul din favoritele userului logat
 */
router.delete('/:productId', verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.productId, 10);
    if (isNaN(productId)) {
      return res.status(400).json({ success: false, message: 'Product id is not valid', data: {} });
    }

    await Favorite.destroy({ where: { user_id: req.userId, product_id: productId } });

    res.status(200).json({ success: true, message: 'Product removed from favorites', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error removing favorite', data: error.message });
  }
});

module.exports = router;
