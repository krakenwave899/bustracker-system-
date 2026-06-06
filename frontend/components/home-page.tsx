'use client'

import { Search, Bus } from 'lucide-react'
import { Bus as BusType } from '@/lib/bus-data'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Bus className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">SNU Bus Tracker</h1>
            <p className="text-xs text-muted-foreground">Real-time tracking</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by route or area..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>
      </div>
    </header>
  )
}

interface RouteCardProps {
  bus: BusType
  onTrackLive: (bus: BusType) => void
}

export function RouteCard({ bus, onTrackLive }: RouteCardProps) {
  const statusConfig = {
    'on-time': { label: 'On Time', bgColor: 'bg-success/20', textColor: 'text-success' },
    'delayed': { label: 'Delayed', bgColor: 'bg-warning/20', textColor: 'text-warning' },
    'not-started': { label: 'Not Started', bgColor: 'bg-danger/20', textColor: 'text-danger' },
  }

  const status = statusConfig[bus.status]

  return (
    <div className="bg-card rounded-2xl p-4 border border-border hover:border-primary/50 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">{bus.routeNumber}</h3>
          <p className="text-sm text-muted-foreground">
            {bus.from} → {bus.to}
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
          {status.label}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{bus.departureTime}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{bus.driverName}</span>
        </div>
      </div>
      
      <button
        onClick={() => onTrackLive(bus)}
        disabled={bus.status === 'not-started'}
        className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-medium rounded-xl transition-colors"
      >
        {bus.status === 'not-started' ? 'Not Available' : 'Track Live'}
      </button>
    </div>
  )
}
