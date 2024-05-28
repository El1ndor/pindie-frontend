'use client'
import { endpoints } from './api/config'
import { Banner } from './components/Banner/Banner'

import { Promo } from './components/Promo/Promo'
import { getNormalizedGamesDataByCategory } from './api/api-utils.js'
import { CardsListSection } from './components/CardsListSection/CardsListSection'
import { useGetDataByCategory } from './api/api-hoocs'
import { Preloader } from './components/Preloader/Preloader'

export default function Home () {
  const popularGames = useGetDataByCategory(endpoints.games, 'popular')
  const newGames = useGetDataByCategory(endpoints.games, 'new')
  return (
    <main className='main'>
      <Banner />
      {popularGames ? (
      <CardsListSection
        id='popular'
        title='Популярные'
        type='slider'
        data={popularGames}
      />
      ) : (
        <Preloader/>
      )}
      {newGames ? (
      <CardsListSection
        id='new'
        title='Новинки'
        type='slider'
        data={newGames}
      />
      ) : (
        <Preloader/>
      )}
      <Promo />
    </main>
  )
}
