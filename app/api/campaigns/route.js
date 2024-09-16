import connectDB from "@/config/database"
import Campaign from "@/models/Campaign"

// GET /api/campaigns
export const GET = async (request) => {
    try{
        await connectDB()

        const campaigns = await Campaign.find({})
        
        return new Response(JSON.stringify(campaigns), {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return new Response('Something Went Wrong', { status:500})
    }
}