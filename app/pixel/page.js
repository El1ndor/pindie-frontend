'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'
import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function pixelPage () {
  const pixelArray = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'pixel'
  )
  return (
    <main className='main-inner'>
      {pixelArray ? (
        <CardsListSection id='pixel' title='Пиксельные' data={pixelArray} />
      ) : (
        <Preloader />
      )}
    </main>
  )
}
