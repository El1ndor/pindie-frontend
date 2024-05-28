'use client'
import { endpoints } from '../../api/config'

import { useState, useEffect } from 'react'
import {
  getNormalizedGameDataByld,
  isResponseOK,
  checkIfUserVoted,
  vote,
  getJWT,
  getMe
} from '@/app/api/api-utils'

import Styles from './game.module.css'
import { Preloader } from '@/app/components/Preloader/Preloader'
import { GameNotFound } from '@/app/components/GameNotFound/GameNotFound'
import { useRouter } from 'next/navigation'

import { useStore } from '@/app/store/app-store'
import { useGetDataByCategory } from '@/app/api/api-hoocs'

export default function GamePage (props) {
  const router = useRouter()
  const [game, setGame] = useState(null)
  const [preloaderVisible, setPreloaderVisible] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isVoted, setIsVoted] = useState(false)
  const authContext = useStore()

  useEffect(() => {
    async function fetchData () {
      const game = await useGetDataByCategory(
        endpoints.games,
        props.params.id
      )
      isResponseOK(game) ? setGame(game) : setGame(null)
      setPreloaderVisible(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const jwt = getJWT()
    if (jwt) {
      getMe(endpoints.me, jwt).then(userData => {
        if (isResponseOK(userData)) {
          setIsAuthorized(true)
          setCurrentUser(userData)
        } else {
          setIsAuthorized(false)
          removeJWT()
        }
      })
    }
  }, [])

  useEffect(() => {
    authContext.user && game
      ? setIsVoted(checkIfUserVoted(game.users, authContext.user.id))
      : setIsVoted(false)
  }, [authContext.user, game])

  const handleVote = async () => {
    const jwt = authContext.token
    let usersIdArray = game.users.length ? game.users.map(user => user.id) : []
    usersIdArray.push(authContext.user.id)
    const response = await vote(
      `${endpoints.games}/${game.id}`,
      jwt,
      usersIdArray
    )
    if (isResponseOK(response)) {
      setGame(() => {
        return {
          ...game,
          users: [...game.users, authContext.user]
        }
      })
      setIsVoted(true)
    }
  }

  return (
    <main className='main'>
      {game ? (
        <>
          <section className={Styles['game']}>
            <iframe className={Styles['game__iframe']} src={game.link}></iframe>
          </section>
          <section className={Styles['about']}>
            <h2 className={Styles['about__title']}>{game.title}</h2>
            <div className={Styles['about__content']}>
              <p className={Styles['about__description']}>
                Вы играете за волшебника, последнюю надежду Земли, которую
                поглотил мрак... Вы должны любой ценой защищать магический
                кристалл, ведь это единственное, что сможет вернуть всё на круги
                своя, но полчища монстров так и норовят его уничтожить. Ваша
                задача уничтожить все кладбища.
              </p>
              <div className={Styles['about__author']}>
                <p>
                  Автор:
                  <span className={Styles['about__accent']}>
                    {game.developer}
                  </span>
                </p>
              </div>
            </div>
            <div className={Styles['about__vote']}>
              <p className={Styles['about__vote-amount']}>
                За игру уже проголосовали:
                <span className={Styles['about__accent']}>
                  {game.users.length}
                </span>
              </p>
              <button
                disabled={!authContext.isAuth || isVoted}
                className={`button ${Styles['about__vote-button']}`}
                onClick={handleVote}
              >
                {isVoted ? 'Голоc учтён' : 'Голосовать'}
              </button>
            </div>
          </section>
        </>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (
        <GameNotFound />
      )}
    </main>
  )
}
