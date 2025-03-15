import mongoose,{type Document,model,Schema} from "mongoose";

export interface IResources extends Document{
    type:'private'|'public';
    owner:mongoose.Types.ObjectId;
};

const resources_schema = new Schema<IResources>({
    type:{type:String,enum:['private','public']},
    owner:{type:Schema.Types.ObjectId,ref:'User'}
});

export const Resource = model<IResources>('resource',resources_schema);