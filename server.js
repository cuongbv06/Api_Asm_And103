const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const apiMobile = require('./api')
const common = require('./common')

app.use('/api', apiMobile)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const uri = common.uri;
const mongoose = require('mongoose');
const phoneModel = require('./phoneModel');

app.get('/', async (req, res) => {
  try {
    await mongoose.connect(uri);
    let phones = await phoneModel.find();
    console.log(phones);
    res.send(phones);
  } catch (error) {
    console.error('Error fetching phones:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add_phone', async (req, res) => {
  await mongoose.connect(uri);

  const { ten, mau, gia } = req.body;

  // Kiểm tra xem các trường cần thiết đã được cung cấp chưa
  if (!ten || !mau || !gia) {
    return res.status(400).json({ message: `Các trường ten, mau, gia là bắt buộc  + ${ten} + ${mau} + ${gia} `});
  }

  let phone = {
    ten: ten,
    mau: mau,
    gia: gia
  };

  console.log(phone);

  try {
    let kq = await phoneModel.create(phone);
    console.log(`ten: ${ten} mau: ${mau} gia: ${gia}`);
    let phones = await phoneModel.find();
    res.send(phones);
  } catch (error) {
    console.error('Error adding phone:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi thêm điện thoại' });
  }
});
