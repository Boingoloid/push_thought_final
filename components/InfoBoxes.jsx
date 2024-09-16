import InfoBox from './InfoBox'

const InfoBoxes = () => {
  return (

    // {/* <!-- Renters and Owners --> */}
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
                heading="For Citizens"
                backgroundColor="bg-gray-100"
                buttonInfo={{
                    text: 'Browse Campaigns',
                    link: '/campaigns',
                    backgroundColor:'bg-black',
                }}>
                    Take action by supporting your favorite cause.
            </InfoBox>
            <InfoBox
                heading="For Activists"
                backgroundColor="bg-blue-100"
                buttonInfo={{
                    text: 'Add Campaign',
                    link: '/campaigns/add',
                    backgroundColor:'bg-blue-500',
                }}>
                    Set up a landing page for your messaging campaign.
            </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes