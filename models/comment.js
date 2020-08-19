var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
    text: String,
    author: {
    	id: {
    		type: mongoose.Schema.Types.ObjectId,
    		ref: "User" // the name that we use to refer to the ModelID
    	},
    	name: String //username(initially)
    }
});
 
module.exports = mongoose.model("Comment", commentSchema);