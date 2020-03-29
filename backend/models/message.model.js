const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eachMessage = new Schema({
  fromEmailId:String,
  fromRole:String,
  toEmailId:String,
  toRole:String,
  message:String,
  createdAt:{type: Date,default: Date.now}
});

const message = new Schema({
  conversationId:String,
  participant1emailId:String,
  participant1Role:String,
  participant1ProfilePictureUrl:String,
  participant1Name:String,
  participant2emailId:String,
  participant2Role:String,
  participant2ProfilePictureUrl:String,
  participant2Name:String,
  chat:[eachMessage]
});

module.exports = mongoose.model('message',message);