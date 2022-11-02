const express = require('express');
const auth = require("../../middlewares/sellerAuth");
const {BadRequestError, NotFoundError} = require("../../util/errorHandler");
const Order = require("../../models/order");
const {ObjectId} = require("mongodb");
const Issue = require("../../models/issue");
const router = new express.Router();

router.get('/seller/dashboard', auth, async (req, res) => {
    try {
        return res.send({
            name: req.seller.name,
            image: req.seller.image,
            views: req.seller.views,
            notifications: [],
            messages: []
        })
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.get('/seller/dashboard/orders', auth, async (req, res) => {
    try {
        const orders = await Order.aggregate([{
            $match: {
                seller: ObjectId(req.seller._id),
                status: {
                    $in: ['COMPLETED', 'PAID']
                },
                createdAt: {$gte: new Date(`01-01-${new Date().getFullYear()}`)}
            }
        }, {
            $group: {
                _id: {$month: "$createdAt"},
                count: {$sum: 1}
            }
        }])
        const arr = Array(new Date().getMonth()).fill(0);
        orders.forEach((order) => {
            arr[order._id - 1] = order.count;
        })
        return res.send(arr)
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message));
    }
})

router.get('/seller/dashboard/issues', auth, async (req, res) => {
    try {
        const issue = Issue.aggregate([{
            $match: {
                seller: ObjectId(req.seller._id),
                createdAt: {$gte: new Date(`01-01-${new Date().getFullYear()}`)},
            }
        }, {
            $group: {
                _id: {$month: "$createdAt"},
                count: {$sum: 1}
            }
        }])
        const issues = await issue.exec()
        const arr = Array(new Date().getMonth()).fill(0);
        issues.forEach((issue) => {
            arr[issue._id - 1] = issue.count;
        })
        return res.send(arr);
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/dashboard/payments', auth, async (req, res) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);
    try {
        const payments = await Order.aggregate([{
            $match: {
                seller: ObjectId(req.seller._id),
                updatedAt: {
                    $gt: firstDay,
                    $lt: lastDay
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
        }])
        if (payments && payments.length > 0) {
            return res.send(payments[0]);
        }
        return res.status(400).send(new BadRequestError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

module.exports = router;