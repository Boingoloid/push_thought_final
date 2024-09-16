import { Schema, model, models } from 'mongoose'

const CampaignSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        reequired: true,
    },
    title: {
        type: String,
        // reequired: true,
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        street:{
            type: String
        },
        city:{
            type: String
        },
        state:{
            type: String
        },
        zipcode:{
            type: String
        },    
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true        
    },
    square_feet: {
        type: Number,
        required: true
    },
    amenities: [
        {
            type: String
        },
    ],
    rates: {
        nightly: {
            type: Number
        },
        weekly: {
            type: Number
        },
        monthly: {
            type: Number
        },
    },
    seller_info: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },        
    },
    images: [
        {
            type: String
        }
    ],
    is_featured: {
        type: Boolean,
        default: false
    },
},{
        timestamps: true
})

const Campaign = models.Campaign || model('Campaign', CampaignSchema)

export default Campaign