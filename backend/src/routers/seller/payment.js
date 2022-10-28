const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const Payment = require("../../models/payment");
const Order = require("../../models/order");
const {ObjectId} = require("mongodb");
const {NotFoundError} = require("../../util/errorHandler");
const router = new express.Router();

router.get('/seller/payments', auth, async (req, res) => {
    const startDate = new Date(req.query.startDate)
    const endDate = new Date(req.query.endDate);
    endDate.setDate(endDate.getDate() + 1);
    console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
    await Order.aggregate([{
        $match: {
            seller: ObjectId(req.seller._id),
            updatedAt: {
                $gt: startDate,
                $lt: endDate
            },
            status: {
                $in: ['CREATED', 'PAID', 'SHIPPED', 'DELIVERED', 'ISSUE', 'CANCELLED', 'REFUNDED', 'COMPLETED']
            },
        }
    }, {
        $group: {
            _id: req.seller._id,
            // count:{$sum: '$amount'}
            'paid': {
                $sum: {$cond: {if: {$or: [{$eq: ['$status', 'PAID']}, {$eq: ['$status', 'SHIPPED']}, {$eq: ['$status', 'DELIVERED']}]}, then: '$amount', else: 0}}
            },
            'completed': {
                $sum: {$cond: {if: {$eq: ['$status', 'COMPLETED']}, then: '$amount', else: 0}}
            },
            'created': {
                $sum: {$cond: {if: {$eq: ['$status', 'CREATED']}, then: '$amount', else: 0}}
            }
        }
    }], async (error, result) => {
        console.log(result);
        if (result && result.length > 0) {
            const payments =
                await Order.find({
                    seller: req.seller._id,
                    status: ['CREATED', 'PAID', 'SHIPPED', 'DELIVERED', 'ISSUE', 'CANCELLED', 'REFUNDED', 'COMPLETED'],
                    updatedAt: {
                        $gt: startDate,
                        $lt: endDate
                    }
                })
                    .sort({updatedAt: -1})
                    .populate('customer', 'name');
            return res.send({
                payments,
                paidTotal: result[0].paid,
                completedTotal: result[0].completed,
                createdTotal: result[0].created,
            })
        } else if (error) {
            return res.status(404).send(new NotFoundError(error.message));
        }
        return res.send({
            payments: [],
            paidTotal: 0,
            completedTotal: 0,
        })
    })
})

module.exports = router;