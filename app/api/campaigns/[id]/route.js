import connectDB from "@/config/database"
import Campaign from "@/models/Campaign"

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