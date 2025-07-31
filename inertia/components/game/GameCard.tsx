import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { Card as GameCardType } from '../../types/game'

interface GameCardProps {
  card: GameCardType
  isSelected?: boolean
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
}

const getCardTypeIcon = (type: GameCardType['type']) => {
  switch (type) {
    case 'SOUTIEN':
      return '🛡️'
    case 'ALLIANCE':
      return '🤝'
    case 'TRAHISON':
      return '⚔️'
    case 'VILLE':
      return '🏛️'
  }
}

const getCardTypeColor = (type: GameCardType['type']) => {
  switch (type) {
    case 'SOUTIEN':
      return 'from-blue-600 to-blue-700'
    case 'ALLIANCE':
      return 'from-green-600 to-green-700'
    case 'TRAHISON':
      return 'from-red-600 to-red-700'
    case 'VILLE':
      return 'from-purple-600 to-purple-700'
  }
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'w-16 h-24 text-xs'
    case 'md':
      return 'w-20 h-28 text-sm'
    case 'lg':
      return 'w-24 h-32 text-base'
  }
}

export function GameCard({
  card,
  isSelected = false,
  isDisabled = false,
  size = 'md',
  onClick,
  className,
}: GameCardProps) {
  const cardTypeColor = getCardTypeColor(card.type)
  const sizeClasses = getSizeClasses(size)
  const icon = getCardTypeIcon(card.type)

  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg',
        'bg-gradient-to-br text-white',
        cardTypeColor,
        sizeClasses,
        {
          'ring-2 ring-yellow-400 ring-offset-2 scale-105': isSelected,
          'opacity-50 cursor-not-allowed': isDisabled,
          'hover:scale-100': isDisabled,
        },
        className
      )}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="absolute inset-0 p-2 flex flex-col justify-between">
        {/* Type et icône en haut */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold opacity-75">{card.type}</span>
          <span className="text-lg">{icon}</span>
        </div>

        {/* Valeur au centre */}
        <div className="flex-1 flex items-center justify-center">
          <span className="text-2xl font-bold drop-shadow-lg">
            {card.type === 'VILLE' ? '★' : card.value}
          </span>
        </div>

        {/* Badge de type en bas */}
        <div className="flex justify-center">
          <Badge
            variant={card.type.toLowerCase() as any}
            className="text-xs px-2 py-0 bg-black/20 text-white border-white/20"
          >
            {card.value !== 0 ? card.value : '★'}
          </Badge>
        </div>
      </div>

      {/* Effet de brillance */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
    </Card>
  )
}