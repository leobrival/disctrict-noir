import { useState } from 'react'
import { PlayerArea } from './PlayerArea'
import { GameLine } from './GameLine'
import { ScoreBoard } from './ScoreBoard'
import { ActionButtons } from './ActionButtons'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { GameState, ScoreBreakdown, VictoryResult } from '../../types/game'

interface GameBoardProps {
  gameState: GameState
  playerNames: [string, string]
  currentPlayerId: string
  scores?: [ScoreBreakdown, ScoreBreakdown]
  victoryResult?: VictoryResult
  onPlayCard?: (cardId: string) => void
  onTakeCards?: () => void
  onPassTurn?: () => void
  className?: string
}

export function GameBoard({ 
  gameState, 
  playerNames,
  currentPlayerId,
  scores,
  victoryResult,
  onPlayCard,
  onTakeCards,
  onPassTurn,
  className 
}: GameBoardProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>()
  
  const [player1, player2] = gameState.players
  const [name1, name2] = playerNames
  
  const currentPlayer = gameState.players.find(p => p.id === currentPlayerId)
  const isPlayer1Turn = gameState.currentPlayer === 0
  const isPlayer2Turn = gameState.currentPlayer === 1
  
  const canTakeCardsFromLine = currentPlayer && 
    gameState.line.length > 0 && 
    !currentPlayer.hasCollectedThisRound &&
    gameState.players[gameState.currentPlayer].id === currentPlayerId

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(selectedCardId === cardId ? undefined : cardId)
  }

  const handlePlayCard = (cardId: string) => {
    onPlayCard?.(cardId)
    setSelectedCardId(undefined)
  }

  if (!currentPlayer) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">Chargement du jeu...</p>
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4', className)}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* En-tête du jeu */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">District Noir</h1>
              <p className="text-sm text-muted-foreground">
                Partie en cours - Tour {gameState.currentRound}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {isPlayer1Turn ? name1 : name2} joue
              </Badge>
              {gameState.gamePhase === 'GAME_END' && (
                <Badge variant="success">Partie terminée</Badge>
              )}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Colonne gauche - Joueur 1 */}
          <div className="space-y-4">
            <PlayerArea
              player={player1}
              playerName={name1}
              isCurrentPlayer={isPlayer1Turn && player1.id === currentPlayerId}
              canPlay={isPlayer1Turn && player1.id === currentPlayerId}
              selectedCardId={player1.id === currentPlayerId ? selectedCardId : undefined}
              onCardSelect={player1.id === currentPlayerId ? handleCardSelect : undefined}
            />
          </div>

          {/* Colonne centrale - Zone de jeu */}
          <div className="space-y-4">
            {/* Tableau des scores */}
            <ScoreBoard
              players={gameState.players}
              playerNames={playerNames}
              currentRound={gameState.currentRound}
              scores={scores}
              victoryResult={victoryResult}
            />

            {/* Ligne de cartes */}
            <GameLine
              cards={gameState.line}
              canTakeCards={canTakeCardsFromLine}
            />

            {/* Boutons d'action */}
            <ActionButtons
              gameState={gameState}
              currentPlayer={currentPlayer}
              selectedCardId={selectedCardId}
              onPlayCard={handlePlayCard}
              onTakeCards={onTakeCards}
              onPassTurn={onPassTurn}
            />
          </div>

          {/* Colonne droite - Joueur 2 */}
          <div className="space-y-4">
            <PlayerArea
              player={player2}
              playerName={name2}
              isCurrentPlayer={isPlayer2Turn && player2.id === currentPlayerId}
              canPlay={isPlayer2Turn && player2.id === currentPlayerId}
              selectedCardId={player2.id === currentPlayerId ? selectedCardId : undefined}
              onCardSelect={player2.id === currentPlayerId ? handleCardSelect : undefined}
            />
          </div>
        </div>

        {/* Informations de debug (en développement) */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="p-3 bg-slate-100">
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-mono">Debug Info</summary>
              <pre className="mt-2 text-xs">
                {JSON.stringify({
                  currentPlayer: gameState.currentPlayer,
                  actionCount: gameState.actionCount,
                  gamePhase: gameState.gamePhase,
                  lineCards: gameState.line.length,
                  selectedCard: selectedCardId
                }, null, 2)}
              </pre>
            </details>
          </Card>
        )}
      </div>
    </div>
  )
}