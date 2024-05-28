'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'
import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function TdsPage () {
  const TDSArray = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'TDS'
  )
  return (
    <main className='main-inner'>
      {TDSArray ? (
        <CardsListSection id='TDS' title='TDS' data={TDSArray} />
      ) : (
        <Preloader />
      )}
    </main>
  )
}
