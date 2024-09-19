import connectDB from "@/config/database"
import Campaign from "@/models/Campaign"
import { getSessionUser } from "@/utils/getSessionUser"

// GET /api/campaigns/:id
export const GET = async (request, { params }) => {
    try{
        await connectDB()

        const campaign = await Campaign.findById(params.id)

        if(!campaign) return new Response('Campaign Not Found', {status:404})
        
        return new Response(JSON.stringify(campaign), {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong', { status:500})
    }
}

// DELETE /api/campaigns/:id
export const DELETE = async (request, { params }) => {
    try{
        const campaignId = params.id

        const sessionUser = await getSessionUser()

        // Check for session
        if(!sessionUser || !sessionUser.userId){
            return new Response('User ID is required', { status: 401})
        }

        const { userId } = sessionUser


        await connectDB()

        const campaign = await Campaign.findById(campaignId)

        if(!campaign) return new Response('Campaign Not Found', {status:404})
        
        //  Verify ownership
        if(campaign.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401})
        }

        await campaign.deleteOne()

        return new Response('Campaign Deleted', {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong', { status:500})
    }
}

// PUT /api/campaigns/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 })
        }

        const { id } = params
        const { userId } = sessionUser

        const formData = await request.formData()

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities')
        
        // Get Camapign to update
        const existingCampaign = await Campaign.findById(id)

        if(!existingCampaign){
            return new Response('Campaign does not exist', {status: 404})
        }

        // Verify ownership
        if(existingCampaign.owner.toString() !== userId){
            return new Response('Unauthorized', {status:401})
        }

        // Create campaignData object for database
        const campaignData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'), // This line is not working and returning null
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        }

        // Update campaign in database
        const updateCampaign = await Campaign.findByIdAndUpdate(id, campaignData)

        return new Response(JSON.stringify(updateCampaign), {
            status: 200,
        })
    } catch (error) {
        return new Response('Failed to add campaign', { status: 500 })
    }
}