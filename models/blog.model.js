import mongoose from "mongoose";


const blogSchema =
new mongoose.Schema({

    title:{

        type:String,

        required:true,

        trim:true

    },


    category:{

        type:String,

        required:true

    },


    image:{

        type:String,

        required:true

    },


    description:{

        type:String,

        required:true,

        maxlength:180

    },


    content:{

        type:String,

        required:true

    },


    author:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    },


    views:{

        type:Number,

        default:0

    },


    likes:{

        type:Number,

        default:0

    },


    status:{

        type:String,

        default:"published"

    }


},
{
    timestamps:true
});


export default mongoose.model(
    "Blog",
    blogSchema
);