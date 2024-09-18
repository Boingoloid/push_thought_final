import connectDB from "@/config/database"
import Campaign from "@/models/Campaign"
import { getSessionUser } from "@/utils/getSessionUser"
import cloudinary from '@/config/cloudinary'


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
        await connectDB()

        const sessionUser = await getSessionUser()

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 })
        }

        const { userId } = sessionUser

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
            owner: userId,
        }

        // Upload image(s) to Cloudinary
        const imageUploadPromises = []

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer()
            const imageArray = Array.from(new Uint8Array(imageBuffer))
            const imageData = Buffer.from(imageArray)

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64')

            // Make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`,{
                    folder: 'pushthoughtfolder'
                }
            )

            imageUploadPromises.push(result.secure_url)

            // Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises)
            // Add uploaded images to the campaignData object
            campaignData.images = uploadedImages

        }
        const newCampaign = new Campaign(campaignData)
        await newCampaign.save()

        return Response.redirect(`${process.env.NEXTAUTH_URL}/campaigns/${newCampaign._id}`)

        // return new Response(JSON.stringify({ message: 'Success' }), {
        //     status: 200,
        // })
    } catch (error) {
        return new Response('Failed to add campaign', { status: 500 })
    }
}