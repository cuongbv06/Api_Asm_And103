const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
const local = "mongodb://127.0.0.1:27017/MyDatabaseDemo"
const List = "mongodb+srv://sonansz123:Phuc02042004@cluster0.kwro6ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connect = async () => {
    try{
        await mongoose.connect(local, {
            
        })
        console.log("connect success");
    }catch(err){
        console.log(err);
        console.log("connect fail");
    }
}

module.exports = {connect}