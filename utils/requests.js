const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

async function fetchCampaigns(){
    try {
      
        // Handle the case where the domain is not availble yet
        if(!apiDomain){
            return []
          }

        const res = await fetch(`${apiDomain}/campaigns`)
      
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
    
      return res.json()
    } catch (error) {
        console.log(error)
        return []
    }
  }

  export { fetchCampaigns }