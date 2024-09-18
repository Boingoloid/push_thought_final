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