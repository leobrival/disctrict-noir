import { GameCard } from './GameCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Card as GameCardType } from '../../types/game'
import { GAME_CONSTANTS } from '../../types/game'

interface GameLineProps {
  cards: GameCardType[]
  canTakeCards?: boolean
  className?: string
}

export function GameLine({ cards, canTakeCards = false, className }: GameLineProps) {
  const cardsToTake = Math.min(cards.length, GAME_CONSTANTS.MAX_LINE_COLLECTION)
  const lastCards = cards.slice(-cardsToTake)
  const otherCards = cards.slice(0, -cardsToTake)

  return (
    <Card className={cn('p-6', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Ligne de cartes</h3>
        <Badge variant="outline" className="text-sm">
          {cards.length} cartes
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Cartes non collectables (grises) */}
        {otherCards.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">
              Cartes non collectables
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {otherCards.map((card, index) => (
                <div
                  key={card.id}
                  className="opacity-50"
                  style={{
                    zIndex: otherCards.length - index,
                    marginLeft: index > 0 ? '-12px' : '0',
                  }}
                >
                  <GameCard card={card} size="sm" isDisabled />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cartes collectables */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-muted-foreground">
              Cartes collectables
            </p>
            {canTakeCards && cardsToTake > 0 && (
              <Badge variant="success" className="text-xs">
                Max {cardsToTake} cartes
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {lastCards.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>Aucune carte disponible</p>
              </div>
            ) : (
              lastCards.map((card, index) => (
                <div
                  key={card.id}
                  className={cn(
                    'relative transition-all duration-200',
                    canTakeCards && 'ring-2 ring-yellow-400/50 rounded-lg'
                  )}
                  style={{
                    zIndex: lastCards.length - index,
                    marginLeft: index > 0 ? '-12px' : '0',
                  }}
                >
                  <GameCard
                    card={card}
                    size="md"
                    className={cn(
                      'hover:z-10',
                      canTakeCards && 'shadow-lg border-yellow-400/30'
                    )}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {canTakeCards && cardsToTake > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-yellow-700 bg-yellow-100 rounded-lg px-3 py-2">
            ⚡ Vous pouvez collecter ces {cardsToTake} cartes
          </p>
        </div>
      )}
    </Card>
  )
}