import { Head, usePage } from '@inertiajs/react'
import { GameBoard } from '../../components/game'
import type { GameState, ScoreBreakdown, VictoryResult } from '../../types/game'

interface GamePageProps {
  gameState: GameState
  playerNames: [string, string]
  currentPlayerId: string
  scores?: [ScoreBreakdown, ScoreBreakdown]
  victoryResult?: VictoryResult
}

export default function GamePage() {
  const { props } = usePage<GamePageProps>()
  const { gameState, playerNames, currentPlayerId, scores, victoryResult } = props

  const handlePlayCard = (cardId: string) => {
    // TODO: Envoyer l'action au serveur via Inertia
    console.log('Play card:', cardId)
  }

  const handleTakeCards = () => {
    // TODO: Envoyer l'action au serveur via Inertia
    console.log('Take cards from line')
  }

  const handlePassTurn = () => {
    // TODO: Envoyer l'action au serveur via Inertia
    console.log('Pass turn')
  }

  return (
    <>
      <Head title="District Noir - Partie en cours" />
      
      <GameBoard
        gameState={gameState}
        playerNames={playerNames}
        currentPlayerId={currentPlayerId}
        scores={scores}
        victoryResult={victoryResult}
        onPlayCard={handlePlayCard}
        onTakeCards={handleTakeCards}
        onPassTurn={handlePassTurn}
      />
    </>
  )
}