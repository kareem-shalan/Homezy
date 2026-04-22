import Badge from './Badge'
import Card from './Card'

const PropertyCard = ({ property, compact = false }) => {
  return (
    <Card className="overflow-hidden">
      <div className={compact ? 'h-36' : 'h-48'}>
        <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {property.tags?.map((tag) => (
            <Badge key={tag} variant="success">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-neutral-900">{property.title}</h3>
          <p className="text-lg font-bold text-primary-800">{property.price}</p>
        </div>
        <p className="mt-1 text-sm text-neutral-600">{property.location}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-md bg-neutral-100 p-2 text-xs text-neutral-700">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.area}</span>
        </div>
      </div>
    </Card>
  )
}

export default PropertyCard
