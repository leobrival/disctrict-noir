import { GameCard } from './GameCard'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Card as GameCardType, CardType } from '../../types/game'

interface CollectedCardsProps {
  cards: GameCardType[]
  playerName?: string
  className?: string
}

const groupCardsByType = (cards: GameCardType[]) => {
  const groups: Record<CardType, GameCardType[]> = {
    SOUTIEN: [],
    ALLIANCE: [],
    TRAHISON: [],
    VILLE: [],
  }

  cards.forEach(card => {
    groups[card.type].push(card)
  })

  return groups
}

const getTypeLabel = (type: CardType) => {
  switch (type) {
    case 'SOUTIEN':
      return 'Soutien 🛡️'
    case 'ALLIANCE':
      return 'Alliance 🤝'
    case 'TRAHISON':
      return 'Trahison ⚔️'
    case 'VILLE':
      return 'Ville 🏛️'
  }
}

export function CollectedCards({ cards, playerName, className }: CollectedCardsProps) {
  const cardGroups = groupCardsByType(cards)
  const totalCards = cards.length

  return (
    <Card className={cn('p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          {playerName ? `Cartes de ${playerName}` : 'Cartes collectées'}
        </h3>
        <Badge variant="outline" className="text-xs">
          {totalCards} cartes
        </Badge>
      </div>

      <div className="space-y-3">
        {(Object.keys(cardGroups) as CardType[]).map(type => {
          const typeCards = cardGroups[type]
          if (typeCards.length === 0) return null

          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {getTypeLabel(type)}
                </span>
                <Badge 
                  variant={type.toLowerCase() as any} 
                  className="text-xs"
                >
                  {typeCards.length}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-1">
                {typeCards.map((card, index) => (
                  <div
                    key={card.id}
                    style={{
                      zIndex: typeCards.length - index,
                      marginLeft: index > 0 ? '-8px' : '0',
                    }}
                  >
                    <GameCard
                      card={card}
                      size="sm"
                      className="hover:z-10 hover:scale-110"
                    />
                  </div>
                ))}
              </div>

              {/* Afficher les valeurs pour SOUTIEN */}
              {type === 'SOUTIEN' && typeCards.length > 0 && (
                <div className="text-xs text-muted-foreground pl-1">
                  Valeurs: {typeCards.map(c => c.value).sort().join(', ')}
                </div>
              )}
            </div>
          )
        })}

        {totalCards === 0 && (
          <div className="py-6 text-center text-muted-foreground">
            <p className="text-sm">Aucune carte collectée</p>
          </div>
        )}
      </div>
    </Card>
  )
}