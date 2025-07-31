import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import type { Player, GameState } from '../../types/game'
import { GAME_CONSTANTS } from '../../types/game'

interface ActionButtonsProps {
  gameState: GameState
  currentPlayer: Player
  selectedCardId?: string
  onPlayCard?: (cardId: string) => void
  onTakeCards?: () => void
  onPassTurn?: () => void
  className?: string
}

const getActionsRemaining = (gameState: GameState, playerId: string) => {
  const playerIndex = gameState.players.findIndex(p => p.id === playerId)
  return GAME_CONSTANTS.ACTIONS_PER_PLAYER_PER_ROUND - gameState.actionCount[playerIndex]
}

const canTakeCards = (gameState: GameState, player: Player) => {
  return gameState.line.length > 0 && !player.hasCollectedThisRound
}

const canPlayCard = (selectedCardId: string | undefined, player: Player) => {
  return selectedCardId && player.hand.some(card => card.id === selectedCardId)
}

export function ActionButtons({ 
  gameState, 
  currentPlayer, 
  selectedCardId,
  onPlayCard,
  onTakeCards,
  onPassTurn,
  className 
}: ActionButtonsProps) {
  const actionsRemaining = getActionsRemaining(gameState, currentPlayer.id)
  const canTake = canTakeCards(gameState, currentPlayer)
  const canPlay = canPlayCard(selectedCardId, currentPlayer)
  const collectableCards = Math.min(gameState.line.length, GAME_CONSTANTS.MAX_LINE_COLLECTION)

  const isGameOver = gameState.gamePhase === 'GAME_END'
  const isPlayerTurn = gameState.players[gameState.currentPlayer].id === currentPlayer.id

  if (isGameOver) {
    return (
      <Card className={cn('p-4', className)}>
        <Alert>
          <AlertDescription className="text-center">
            🎉 Partie terminée ! Consultez le tableau des scores.
          </AlertDescription>
        </Alert>
      </Card>
    )
  }

  if (!isPlayerTurn) {
    return (
      <Card className={cn('p-4', className)}>
        <Alert>
          <AlertDescription className="text-center">
            ⏳ En attente du tour de l'adversaire...
          </AlertDescription>
        </Alert>
      </Card>
    )
  }

  return (
    <Card className={cn('p-4 space-y-4', className)}>
      {/* Informations sur les actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Actions disponibles</h3>
        <Badge variant="outline" className="text-sm">
          {actionsRemaining} actions restantes
        </Badge>
      </div>

      {/* Boutons d'action principaux */}
      <div className="grid grid-cols-2 gap-3">
        {/* Jouer une carte */}
        <Button
          variant={canPlay ? "default" : "outline"}
          disabled={!canPlay || actionsRemaining === 0}
          onClick={() => selectedCardId && onPlayCard?.(selectedCardId)}
          className="flex flex-col gap-1 h-auto py-3"
        >
          <span className="text-sm font-semibold">🎴 Jouer une carte</span>
          <span className="text-xs opacity-75">
            {selectedCardId ? 'Carte sélectionnée' : 'Sélectionnez une carte'}
          </span>
        </Button>

        {/* Prendre des cartes */}
        <Button
          variant={canTake ? "secondary" : "outline"}
          disabled={!canTake || actionsRemaining === 0}
          onClick={onTakeCards}
          className="flex flex-col gap-1 h-auto py-3"
        >
          <span className="text-sm font-semibold">📥 Prendre cartes</span>
          <span className="text-xs opacity-75">
            {canTake 
              ? `Max ${collectableCards} cartes disponibles`
              : currentPlayer.hasCollectedThisRound 
                ? 'Déjà collecté ce tour'
                : 'Aucune carte disponible'
            }
          </span>
        </Button>
      </div>

      {/* Passer le tour (si aucune action possible) */}
      {actionsRemaining === 0 && (
        <Button
          variant="outline"
          onClick={onPassTurn}
          className="w-full"
        >
          ⏭️ Passer le tour
        </Button>
      )}

      {/* Aide contextuelle */}
      <div className="text-xs text-muted-foreground space-y-1">
        {actionsRemaining > 0 && (
          <p>• Vous pouvez encore effectuer {actionsRemaining} action(s) ce tour</p>
        )}
        {!currentPlayer.hasCollectedThisRound && gameState.line.length > 0 && (
          <p>• Vous pouvez collecter jusqu'à {collectableCards} cartes de la ligne</p>
        )}
        {currentPlayer.hasCollectedThisRound && (
          <p>• Vous avez déjà collecté des cartes ce tour</p>
        )}
      </div>
    </Card>
  )
}