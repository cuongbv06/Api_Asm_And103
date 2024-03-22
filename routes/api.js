var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors')
const Fruits = require('../models/fruits')

router.post('/add-distributor', async (req, res) => {
    try {
        const data = req.body;
        const newDistributors = new Distributors({
            name: data.name
        })
        const result = await newDistributors.save();
        if (result) {
            res.json({
                "status": 200,
                "messanger": "them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "loi, them khong thanh cong",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/add-fruit', async (req, res) => {
    try {
        const data = req.body;
        const newFruits = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            image: data.image,
            id_distributor: data.id_distributor
        })
        const result = await newFruits.save();
        if (result) {
            res.json({
                "status": 200,
                "messanger": "them thanh cong",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "loi, them khong thanh cong",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/get-list-distributor', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

router.get('/get-list-fruit', async (req, res) => {
    // const authHeader = req.headers['authorization']

    // const token = authHeader && authHeader.split(' ')[1]
    // if(token == null) return res.sendStatus(401)
    // let payload;
    // JWT.verify(token, SECRETKEY, (err, _payLoad) => {
    //     if(err instanceof JWT.TokenExpiredError) return res.sendStatus(401)
    //     if(err) return res.sendStatus(403)
    //     payload = _payLoad;
    // })
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messanger": "danh sach fruit",
            "data": data
        })
        res.render(Fruits)
    } catch (error) {
        console.log(error);
    }
})

router.delete('/destroy-fruit-by-id/:id', async (req, res) => {
    try {
        const {id} = req.params
        const result = await Fruits.findByIdAndDelete(id)
        if(result){
            res.json({
                "status": 200,
                "messenger": "xoa thanh cong",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "loi khong xoa duoc",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

const Upload = require('../config/common/upload')
router.post('/add-fruit-with-file-image', Upload.array('image', 5), async (req, res) => {
    try {
        const data = req.body
        const {files} = req
        const urlsImage =
        files.map((file) => `${req.get("host")}/uploads/${file.filename}`)

        const newFruit = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            image: urlsImage,
            id_distributor: data.id_distributor
        })

        const result = await newFruit.save()

        if(result){
            res.json({
                "status": 400,
                "messenger": "loi khong them duoc",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

const Users = require('../models/users')
const Transporter = require('../config/common/mail')
router.post('/register-send-email' ,Upload.single( 'avatar'), async (req,res) => {
    try {
        const data = req.body;
        const {file} = req
        const newUser = Users({
            userName: data.userName,
            password: data.password,
            email: data.email,
            name: data.name,
            avatar: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        })
        const result = await newUser.save()
        if(result){
            const mailOptions = {
                from: "phucnvph35252@fpt.edu.vn",
                to: result.email,
                subject: "dang ky thanh cong",
                text: "cam on da dang ky"
            }
            await Transporter.sendMail(mailOptions)
            res.json({
                "status": 200,
                "messenger": "them thanh cong",
                "data": result
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "loi, khong thanh cong",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

const JWT = require('jsonwebtoken')
const SECRETKEY = "fptpolytechnic"
router.post('/login', async (req, res) => {
    try {
        const {userName, password} = req.body
        const user = await Users.findOne({userName, password})
        if(user){
            const token = JWT.sign({id: user._id}, SECRETKEY, {expiresIn: '1h'})
            const refreshToken = JWT.sign({id: user._id}, SECRETKEY, {expiresIn: '1d'})
            res.json({
                "status": 200,
                "messenger": "dang nhap thanh cong",
                "data": user,
                "token": token,
                "refreshToken": refreshToken
            })
        }else{
            res.json({
                "status": 400,
                "messenger": "loi, khong dang nhap duoc",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;