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

export const POST = async (request) => {
    try {
        const formData = await request.formData()

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities')
        const images = formData.getAll('images').filter((image) => image.name !== '')

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
            images
        }

            console.log(campaignData)

        return new Response(JSON.stringify({ message: 'Success' }), {
            status: 200,
        })
    } catch (error) {
        return new Response('Failed to add campaign', { status: 500 })
    }
}