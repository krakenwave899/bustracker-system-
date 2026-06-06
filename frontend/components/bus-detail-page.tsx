'use client'

import { ArrowLeft, Gauge, Radio, Clock, Bell, Check, MapPin } from 'lucide-react'
import { Bus } from '@/lib/bus-data'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import socket from '@/lib/socket'
import { getLatestLocation } from '@/lib/api'

const BusMap = dynamic(() => import('./tracking-map').then(mod => mod.BusMap), {
  ssr: false,
  loading: () => (
    <div className="h-[55vh] min-h-[300px] bg-card animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">Loading map...</span>
    </div>
  ),
})

interface BusDetailPageProps {
  bus: Bus
  onBack: () => void
}

export function BusDetailPage({ bus, onBack }: BusDetailPageProps) {
  const [alertSet, setAlertSet] = useState(false)
  const [liveSpeed, setLiveSpeed] = useState(bus.speed)
  const [livePosition, setLivePosition] = useState({ lat: bus.lat, lng: bus.lng })
  const [lastUpdated, setLastUpdated] = useState(bus.lastUpdated)
  const [liveBus, setLiveBus] = useState(bus)

  useEffect(() => {
    // Listen for real-time location updates
    socket.on('busLocationUpdate', (data: any) => {
      // Match by route number since MongoDB IDs differ from static IDs
      if (data.busId) {
        setLiveSpeed(data.speed || 0)
        setLivePosition({ lat: data.lat, lng: data.lng })
        setLastUpdated('Just now')
        setLiveBus(prev => ({
          ...prev,
          lat: data.lat,
          lng: data.lng,
          speed: data.speed || 0,
        }))
      }
    })

    return () => {
      socket.off('busLocationUpdate')
    }
  }, [bus.id])

  const statusConfig = {
    'on-time': { label: 'On Time', color: 'text-success' },
    'delayed': { label: 'Delayed', color: 'text-warning' },
    'not-started': { label: 'Not Started', color: 'text-danger' },
  }

  const status = statusConfig[bus.status]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-background hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{bus.routeNumber}</h1>
            <p className="text-xs text-muted-foreground">Live Tracking</p>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            bus.status === 'on-time' ? 'bg-success/20 text-success' :
            bus.status === 'delayed' ? 'bg-warning/20 text-warning' :
            'bg-danger/20 text-danger'
          }`}>
            {status.label}
          </div>
        </div>
      </header>

      {/* Map — passes live position */}
      <BusMap bus={liveBus} />

      {/* Info Bar */}
      <div className="bg-card border-y border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-sm">
              <span className="font-semibold text-foreground">{liveSpeed}</span>
              <span className="text-muted-foreground"> km/h</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-success animate-pulse" />
            <span className={`text-sm font-medium ${status.color}`}>{status.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Upcoming Stops */}
      <div className="flex-1 bg-background p-4 overflow-auto">
        <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          Upcoming Stops
        </h2>
        
        <div className="relative">
          <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-border" />
          
          <div className="space-y-1">
            {bus.stops.map((stop, index) => {
              const isCompleted = stop.completed
              const isNext = index === bus.nextStopIndex
              const isBusHere = index === bus.nextStopIndex - 1 || (bus.nextStopIndex === 0 && index === 0)
              
              const getETA = () => {
                if (isCompleted) return 'Passed'
                if (isNext) return bus.eta
                const minsFromNext = (index - bus.nextStopIndex) * 8
                return `~${parseInt(bus.eta) + minsFromNext} mins`
              }

              return (
                <div key={index} className="relative">
                  {isBusHere && bus.status !== 'not-started' && (
                    <div className="absolute left-[7px] -top-3 z-10">
                      <div className="flex items-center justify-center w-4 h-4 bg-primary rounded-full animate-bounce">
                        <MapPin className="w-2.5 h-2.5 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                    isNext ? 'bg-primary/10 border border-primary/30' : ''
                  }`}>
                    <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-success/20 border-success' 
                        : isNext 
                          ? 'bg-primary border-primary' 
                          : 'bg-card border-border'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-success" />
                      ) : (
                        <span className={`text-xs font-bold ${isNext ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${
                        isCompleted ? 'text-muted-foreground line-through' : 
                        isNext ? 'text-primary' : 'text-foreground'
                      }`}>
                        {stop.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Scheduled: {stop.arrivalTime}
                      </p>
                    </div>
                    
                    <div className={`text-sm font-medium ${
                      isCompleted ? 'text-muted-foreground' :
                      isNext ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {getETA()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Alert Button */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4 safe-area-inset-bottom">
        <button
          onClick={() => setAlertSet(!alertSet)}
          className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            alertSet 
              ? 'bg-success/20 text-success border border-success/30' 
              : 'bg-primary hover:bg-primary/90 text-primary-foreground'
          }`}
        >
          <Bell className={`w-5 h-5 ${alertSet ? 'fill-current' : ''}`} />
          {alertSet ? 'Alert Set for Your Stop' : 'Set Alert for My Stop'}
        </button>
      </div>
    </div>
  )
}