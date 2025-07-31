import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { GameState, GamePhase } from '../../types/game'
import { GAME_CONSTANTS } from '../../types/game'

interface GameStatusProps {
  gameState: GameState
  playerNames: [string, string]
  className?: string
}

const getPhaseLabel = (phase: GamePhase) => {
  switch (phase) {
    case 'SETUP':
      return 'Configuration'
    case 'PLAYING':
      return 'En cours'
    case 'ROUND_END':
      return 'Fin de tour'
    case 'GAME_END':
      return 'Terminée'
  }
}

const getPhaseColor = (phase: GamePhase) => {
  switch (phase) {
    case 'SETUP':
      return 'outline'
    case 'PLAYING':
      return 'success'
    case 'ROUND_END':
      return 'warning'
    case 'GAME_END':
      return 'destructive'
  }
}

const getRoundProgress = (currentRound: number) => {
  const percentage = (currentRound / GAME_CONSTANTS.MAX_ROUNDS) * 100
  return Math.min(percentage, 100)
}

export function GameStatus({ gameState, playerNames, className }: GameStatusProps) {
  const [name1, name2] = playerNames
  const currentPlayerName = gameState.players[gameState.currentPlayer]
    ? playerNames[gameState.currentPlayer]
    : 'Inconnu'
  
  const roundProgress = getRoundProgress(gameState.currentRound)
  const phaseLabel = getPhaseLabel(gameState.gamePhase)
  const phaseColor = getPhaseColor(gameState.gamePhase)

  return (
    <Card className={cn('p-4', className)}>
      <div className="space-y-4">
        
        {/* État général du jeu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">État du jeu</h3>
            <Badge variant={phaseColor as any}>
              {phaseLabel}
            </Badge>
          </div>
          
          <div className="text-right text-sm text-muted-foreground">
            Tour {gameState.currentRound} / {GAME_CONSTANTS.MAX_ROUNDS}
          </div>
        </div>

        {/* Barre de progression des tours */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progression</span>
            <span>{Math.round(roundProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${roundProgress}%` }}
            />
          </div>
        </div>

        {/* Joueur actuel */}
        {gameState.gamePhase === 'PLAYING' && (
          <Alert className="py-2">
            <AlertDescription className="text-center font-medium">
              🎯 C'est au tour de <strong>{currentPlayerName}</strong>
            </AlertDescription>
          </Alert>
        )}

        {/* Actions restantes par joueur */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-slate-50 rounded">
            <div className="text-sm font-medium">{name1}</div>
            <div className="text-xs text-muted-foreground">
              {GAME_CONSTANTS.ACTIONS_PER_PLAYER_PER_ROUND - gameState.actionCount[0]} actions restantes
            </div>
            {gameState.players[0]?.hasCollectedThisRound && (
              <Badge variant="outline" className="text-xs mt-1">
                Collecté
              </Badge>
            )}
          </div>
          
          <div className="text-center p-2 bg-slate-50 rounded">
            <div className="text-sm font-medium">{name2}</div>
            <div className="text-xs text-muted-foreground">
              {GAME_CONSTANTS.ACTIONS_PER_PLAYER_PER_ROUND - gameState.actionCount[1]} actions restantes
            </div>
            {gameState.players[1]?.hasCollectedThisRound && (
              <Badge variant="outline" className="text-xs mt-1">
                Collecté
              </Badge>
            )}
          </div>
        </div>

        {/* Informations de fin de partie */}
        {gameState.gamePhase === 'GAME_END' && gameState.winner && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-center">
              🎉 Partie terminée ! 
              <strong className="block mt-1">
                Vainqueur: {gameState.winner === gameState.players[0].id ? name1 : name2}
              </strong>
            </AlertDescription>
          </Alert>
        )}

        {/* État de fin de tour */}
        {gameState.gamePhase === 'ROUND_END' && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-center">
              ⏳ Fin du tour {gameState.currentRound}
              {gameState.currentRound < GAME_CONSTANTS.MAX_ROUNDS && (
                <span className="block text-xs mt-1">
                  Préparation du tour suivant...
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  )
}