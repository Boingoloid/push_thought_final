import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'PushThought | Create Political Change',
    description: 'Take action for the causes you care about',
    keyword: 'politics, cause, social change, petition',
}

const layout = ({children}) => {
  return (
    <AuthProvider>
      <html lang='en'>
          <body>
              <Navbar />
              <main>{children}</main>
              <Footer />
          </body>
      </html>
    </AuthProvider>
  )
}

export default layout
