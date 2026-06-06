'use client'

import { useState, useMemo } from 'react'
import { Header, RouteCard } from '@/components/home-page'
import { BusDetailPage } from '@/components/bus-detail-page'
import { busData, Bus } from '@/lib/bus-data'

export default function BusTracker() {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBuses = useMemo(() => {
    if (!searchQuery.trim()) return busData
    
    const query = searchQuery.toLowerCase()
    return busData.filter(bus => 
      bus.routeNumber.toLowerCase().includes(query) ||
      bus.routeName.toLowerCase().includes(query) ||
      bus.from.toLowerCase().includes(query) ||
      bus.to.toLowerCase().includes(query) ||
      bus.stops.some(stop => stop.name.toLowerCase().includes(query))
    )
  }, [searchQuery])

  // Show detail page when a bus is selected
  if (selectedBus) {
    return (
      <BusDetailPage 
        bus={selectedBus} 
        onBack={() => setSelectedBus(null)} 
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      <main className="p-4">
        {/* Stats Bar */}
        <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-card rounded-xl border border-border">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm text-foreground font-medium">
              {busData.filter(b => b.status === 'on-time').length} On Time
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-card rounded-xl border border-border">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-sm text-foreground font-medium">
              {busData.filter(b => b.status === 'delayed').length} Delayed
            </span>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-card rounded-xl border border-border">
            <div className="w-2 h-2 rounded-full bg-danger" />
            <span className="text-sm text-foreground font-medium">
              {busData.filter(b => b.status === 'not-started').length} Not Started
            </span>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuses.map(bus => (
            <RouteCard 
              key={bus.id} 
              bus={bus} 
              onTrackLive={setSelectedBus}
            />
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-card flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No routes found</h3>
            <p className="text-sm text-muted-foreground">Try searching for a different route or area</p>
          </div>
        )}
      </main>
    </div>
  )
}
