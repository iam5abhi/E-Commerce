import React from 'react'
import { AdminToken } from '../../../../features/Token'

const Home = () => {
  return (
    <div>
        {!AdminToken()?null:
        <h1>Home...............................................................</h1>
        }
    </div>
  )
}

export default Home