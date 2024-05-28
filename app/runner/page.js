'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'
import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function RunnerPage () {
  const runnerArray = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'runner'
  )
  return (
    <main className='main-inner'>
      {runnerArray ? (
        <CardsListSection id='runner' title='Ранеры' data={runnerArray} />
      ) : (
        <Preloader />
      )}
    </main>
  )
}
