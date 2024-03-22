const express = require('express')
const router = express.Router()

module.exports = router

const common = require('./common')

const mongoose = require('mongoose')

const phoneModel = require('./phoneModel')

router.get('/', (req, res) => {
    res.send("vao api mobile")
})
const uri = common.uri
router.get('/list', async (req, res) => {
    await mongoose.connect(uri);
    let phones = await phoneModel.find();
    console.log(phones);
    res.send(phones);
})


router.post('/add-car', async (req, res) => {
    try {
        const data = req.body
        const newCar = new phoneModel({
            ten: data.ten,
            gia: data.gia,
            mau: data.mau,
            image: data.image
        })

        const result = await newCar.save()

        if(result){
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete-car/:id', async(req,res) => {
    try {
        const {id} = req.params
        const result = await phoneModel.findByIdAndDelete(id);
        if(result)
        {
            console.log('Xoa thanh cong');
        }
        else{
            //neu ko thanh cong thif thong bao
            console.log('Xoa thất bại');
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/update-car/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ten, gia, mau, image } = req.body;

        // Tìm xe theo id và cập nhật thông tin
        const updatedCar = await phoneModel.findByIdAndUpdate(id, { ten, gia, mau, image }, { new: true });

        if (updatedCar) {
            console.log('Cập nhật thành công:', updatedCar);
            
        } else {
            console.log('Xe không tồn tại hoặc cập nhật không thành công');
        }
            
    } catch (error) {
        console.log('Lỗi khi cập nhật xe:', error);
        
    }
});