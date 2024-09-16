import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'PushThought | Create Political Change',
    description: 'Take action for the causes you care about',
    keyword: 'politics, cause, social change, petition',
}

const layout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </body>
    </html>
  )
}

export default layout
