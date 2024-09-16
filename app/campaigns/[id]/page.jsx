'use client'
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { fetchCampaign } from "@/utils/requests"


const CampaignPage = () => {

  const {id} = useParams()

  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!id) return

      try {
        const dampaign = await fetchCampaign(id)
        setCampaign(campaign)
      } catch (error) {
        console.error('Error fetching campaign: ', error)
      } finally {
        setLoading(false)
      }

    }

    if(campaign === null) {
      fetchCampaignData()
    }

  }, [id, campaign])

  return (
    <div>
      CampaignPage
    </div>
  )
}

export default CampaignPage
