'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import profileDefault from '@/assets/images/profile.png'
import Spinner from "@/components/Spinner"
import { toast } from "react-toastify"

const ProfilePage = () => {
    const { data: session } = useSession()
    const profileImage = session?.user?.image
    const profileName = session?.user?.name
    const profileEmail = session?.user?.email

    const [campaigns, setCampaigns] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserCampaigns = async (userId) => {
            if(!userId){
                return
            }

            try {
                const res = await fetch(`/api/campaigns/user/${userId}`)

                if (res.status === 200) {
                    const data = await res.json()
                    setCampaigns(data)
                }
                
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        // Fetch user campaigns when session is available
        if(session?.user?.id){
            fetchUserCampaigns(session.user.id)
        }
    }, [session])

    const handleDeleteCampaign = async (campaignId) => {
      const confirmed = window.confirm('Are you sure you want to delete this property?')

      if(!confirmed) return

      try {
        const res = await fetch(`/api/campaigns/${campaignId}`, { method: 'DELETE'})

        if(res.status === 200){
          // Remove campaign from state
          const updatedCampaigns = campaigns.filter((campaign) => campaign._id !== campaignId)

          setCampaigns(updatedCampaigns)

          toast.success('Campaign Deleted')
        } else {
          toast.error('Failed to delete property')
        }

      } catch (error) {
        console.log(error)
        toast.error('Failed to delete property')
      }
    }


    
  return (
    // <!-- Profile Section -->
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span>{profileName}</h2>
              <h2 className="text-2xl"><span className="font-bold block">Email: </span>{profileEmail}</h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Campaigns</h2>
              {!loading && campaigns.length === 0 && (
                <p>You have no messaging campaigns</p>
              )}
              { loading ? (<Spinner loading={loading} />) : (
                campaigns.map((campaign) => (
                    <div key={campaign._id} className="mb-10">
                    <Link href={`/campaigns/${campaign._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={campaign.images[0]}
                        alt=""
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{campaign.name}</p>
                      <p className="text-gray-600">Address: { campaign.location.street } {campaign.location.city} {campaign.location.state}  </p>
                    </div>
                    <div className="mt-2">
                      <Link href={`/campaigns/${campaign._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                      onClick={() => handleDeleteCampaign(campaign._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>                    
                ))
              ) }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
