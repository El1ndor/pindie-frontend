'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'

import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function New () {
  const newGames = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'new'
  )
  return (
    <main className='main-inner'>
      {newGames ? (
        <CardsListSection id='new' title='Новинки' data={newGames} />
      ) : (
        <Preloader />
      )}
    </main>
  )
}
