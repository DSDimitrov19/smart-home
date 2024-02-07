import React from 'react'

interface FeaturesCardProps {
  label: string
  description: string
}

const FeaturesCard = ({ label, description }: FeaturesCardProps) => {
  return (
    <div className="h-52 space-x-3 space-y-1 rounded-lg">
      <h1 className="border-l border-blue-500 pl-2 text-xl">{label}</h1>
      <p className="text-md opacity-80">{description}</p>
    </div>
  )
}

export default FeaturesCard