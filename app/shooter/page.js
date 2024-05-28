'use client'
import { getNormalizedGamesDataByCategory } from '@/app/api/api-utils'
import { endpoints } from '@/app/api/config'
import { CardList } from '../components/CardsListSection/CardsList'
import { Preloader } from '../components/Preloader/Preloader'
import { CardsListSection } from '../components/CardsListSection/CardsListSection'

export default async function ShooterPage () {
  const shooterArray = await getNormalizedGamesDataByCategory(
    endpoints.games,
    'shooter'
  )
  return (
    <main className='main-inner'>
    {shooterArray ? (
      <CardsListSection id='shooter' title='Шутеры' data={shooterArray} />
      ) : (
        <Preloader />
      )}
    </main>
  )
}
