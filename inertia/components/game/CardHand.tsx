import { GameCard } from './GameCard'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Card as GameCardType } from '../../types/game'

interface CardHandProps {
  cards: GameCardType[]
  selectedCardId?: string
  canPlay?: boolean
  onCardSelect?: (cardId: string) => void
  className?: string
}

export function CardHand({ 
  cards, 
  selectedCardId, 
  canPlay = true, 
  onCardSelect, 
  className 
}: CardHandProps) {
  return (
    <Card className={cn('p-4', className)}>
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Main ({cards.length} cartes)
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {cards.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>Aucune carte en main</p>
          </div>
        ) : (
          cards.map((card, index) => (
            <div
              key={card.id}
              className="relative"
              style={{
                zIndex: cards.length - index,
                marginLeft: index > 0 ? '-8px' : '0',
              }}
            >
              <GameCard
                card={card}
                size="md"
                isSelected={selectedCardId === card.id}
                isDisabled={!canPlay}
                onClick={() => canPlay && onCardSelect?.(card.id)}
                className="hover:z-10 hover:translate-y-[-4px]"
              />
            </div>
          ))
        )}
      </div>

      {canPlay && cards.length > 0 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Cliquez sur une carte pour la sélectionner
          </p>
        </div>
      )}
    </Card>
  )
}