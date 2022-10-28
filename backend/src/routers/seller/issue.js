const express = require("express");
const router = new express.Router();
const Issue = require('../../models/issue');
const auth = require('../../middlewares/sellerAuth');
const {NotFoundError, BadRequestError} = require("../../util/errorHandler");
const {ResourceUpdatedSuccess} = require("../../util/successHandler");
const {ObjectId} = require("mongodb");

router.get('/seller/issue', auth, async (req, res) => {
    try {
        const issues = await Issue.find({seller: req.seller._id})
        if (issues)
            return res.send(issues);
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/issue/:id', auth, async (req, res) => {
    try {
        const issue = await Issue.findOne({issueId: req.params.id},)
            .populate('customer', 'name');
        if (issue) {
            if(issue.status === "RAISED") {
                issue.status = "VIEWED";
                await issue.save()
            }
            return res.send(issue);
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(404).send(new NotFoundError(e.message));
    }
})

router.get('/seller/issue/refund/:id', async (req, res) => {
    try{
        const issue = await Issue.findOne({issueId: req.params.id},)
        .populate('customer', 'name');
        if(issue) {
            if(issue.status === "RAISED" || issue.status === "VIEWED") {
                issue.status = "REFUNDED";
                await issue.save()
            }
            return res.send(issue);
            // const iss = new Issue(req.body);
            // await iss.save()
            // issue.status = iss.status;
            // issue.save();
            // return res.send(issue);
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.get('/seller/issue/resolve/:id', async (req, res) => {
    try{
        const issue = await Issue.findOne({issueId: req.params.id},)
        .populate('customer', 'name');
        if(issue) {
            if(issue.status === "RAISED" || issue.status === "VIEWED") {
                issue.status = "RESOLVED";
                await issue.save()
            }
            return res.send(issue);
            // const iss = new Issue(req.body);
            // await iss.save()
            // issue.status = iss.status;
            // issue.save();
            // return res.send(issue);
        }
        return res.status(404).send(new NotFoundError());
    } catch (e) {
        return res.status(400).send(new BadRequestError(e.message))
    }
})

router.get('/seller/issues/new', auth, async (req, res) => {
    const issues = await Issue.find({
        seller: ObjectId(req.seller._id),
        status: 'RAISED'
    }).populate('customer', 'name');
    return res.send(issues);
})

module.exports = router;