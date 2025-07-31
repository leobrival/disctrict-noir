import { CardHand } from './CardHand'
import { CollectedCards } from './CollectedCards'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Player } from '../../types/game'

interface PlayerAreaProps {
  player: Player
  playerName: string
  isCurrentPlayer?: boolean
  canPlay?: boolean
  selectedCardId?: string
  onCardSelect?: (cardId: string) => void
  className?: string
}

export function PlayerArea({ 
  player, 
  playerName,
  isCurrentPlayer = false,
  canPlay = false,
  selectedCardId,
  onCardSelect,
  className 
}: PlayerAreaProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* En-tête du joueur */}
      <Card className={cn(
        'p-3 border-2 transition-all duration-200',
        isCurrentPlayer ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">{playerName}</h2>
            {isCurrentPlayer && (
              <Badge variant="success" className="text-xs">
                À votre tour
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Main: {player.hand.length}</span>
            <span>Collectées: {player.collectedCards.length}</span>
            {player.hasCollectedThisRound && (
              <Badge variant="outline" className="text-xs">
                Collecté ce tour
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* Main du joueur */}
      <CardHand
        cards={player.hand}
        selectedCardId={selectedCardId}
        canPlay={canPlay && isCurrentPlayer}
        onCardSelect={onCardSelect}
      />

      {/* Cartes collectées */}
      <CollectedCards
        cards={player.collectedCards}
        playerName={playerName}
      />
    </div>
  )
}