import Hero from "@/components/Hero"
import InfoBoxes from "@/components/InfoBoxes"
import HomeCampaigns from "@/components/HomeCampaigns"
import connectDB from "@/config/database"

const HomePage = () => {

  return (
    <>
        <Hero />
        <InfoBoxes />
        <HomeCampaigns />
    </>
  )
}

export default HomePage
