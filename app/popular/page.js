'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'
import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function PopularPage () {
  const popularArray = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'popular'
  )
  return (
    <main className='main-inner'>
      {popularArray ? (
        <CardsListSection id='popular' title='Популярные' data={popularArray} />
      ) : (
        <Preloader />
      )}
    </main>
  );
};
