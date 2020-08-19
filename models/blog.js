var mongoose = require("mongoose");
//Schema Setup

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   description: String,
   topic: String,
   created: {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      name: String //username[initially]
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   likes: [
       {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model("Blog", blogSchema); // makes a model that uses the schema above


