import CampaignCard from '@/components/CampaignCard'
import { fetchCampaigns } from '@/utils/requests'

const CampaignsPage = async () => {
  const campaigns = await fetchCampaigns()

// Sort campaigns by date
campaigns.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {campaigns.length === 0 ? (
          <p>No campaigns found</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { campaigns.map((campaign) => (
          <CampaignCard key={campaign._id} campaign={ campaign } />
        ))}
        </div>
        )}
      </div>
    </section>
  )
}

export default CampaignsPage
