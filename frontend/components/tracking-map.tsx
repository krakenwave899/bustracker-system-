'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Bus } from '@/lib/bus-data'
import socket from '@/lib/socket'

interface BusMapProps {
  bus: Bus
}

export function BusMap({ bus }: BusMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const initializedRef = useRef(false)
  const lastUpdateRef = useRef(0)
  const [realBusId, setRealBusId] = useState<string | null>(null)

  // Step 1: Fetch real bus ID and position from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/buses')
      .then(res => res.json())
      .then(buses => {
        // Match route number — your buses are named BUS-Route01, BUS-Route02 etc
        const routeKey = bus.routeNumber.replace('Route ', 'Route0').replace('Route 0', 'Route0')
        const realBus = buses.find((b: any) =>
          b.busNumber === `BUS-${bus.routeNumber.replace('Route ', 'Route')}` ||
          b.busNumber.includes(bus.routeNumber.replace('Route ', 'Route'))
        )

        if (realBus) {
          setRealBusId(realBus._id)
          // Move marker to real position
          if (markerRef.current && realBus.lastLat && realBus.lastLng) {
            markerRef.current.setLatLng([realBus.lastLat, realBus.lastLng])
            mapInstanceRef.current?.panTo([realBus.lastLat, realBus.lastLng])
          }
        }
      })
      .catch(() => console.log('Backend not available'))
  }, [bus.routeNumber])

  // Step 2: Initialize map
  useEffect(() => {
    if (!mapRef.current || initializedRef.current) return
    initializedRef.current = true

    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    })

   const map = L.map(mapRef.current, {
  center: [bus.lat, bus.lng],
  zoom: 11,
  zoomControl: true,
})
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CartoDB',
      maxZoom: 19,
    }).addTo(map)

    // Route polyline
    const routeCoords = bus.stops.map(s => [s.lat, s.lng] as [number, number])
    L.polyline(routeCoords, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.8,
      dashArray: '12, 8',
    }).addTo(map)

    // Stop markers
    bus.stops.forEach((stop, index) => {
      const isNext = index === bus.nextStopIndex
      const isCompleted = stop.completed
      const color = isCompleted ? '#22c55e' : isNext ? '#3b82f6' : '#475569'
      const bg = isCompleted ? '#14532d' : isNext ? '#1d4ed8' : '#1e293b'

      const stopIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:24px; height:24px; border-radius:50%;
          background:${bg}; border:2px solid ${color};
          display:flex; align-items:center; justify-content:center;
          font-size:10px; font-weight:bold; color:white;
          box-shadow:0 2px 4px rgba(0,0,0,0.5);
        ">${isCompleted ? '✓' : index + 1}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .addTo(map)
        .bindPopup(`
          <div style="text-align:center; padding:4px;">
            <b style="color:#1e293b;">${stop.name}</b><br/>
            <span style="font-size:12px;color:#64748b;">${stop.arrivalTime}</span>
          </div>
        `)
    })

    // Bus marker
    const busIcon = L.divIcon({
      className: '',
      html: `
        <div style="position:relative; width:44px; height:44px;">
          <div style="
            position:absolute; inset:0; border-radius:50%;
            background:rgba(59,130,246,0.3);
            animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
          "></div>
          <div style="
            position:relative; width:44px; height:44px; border-radius:50%;
            background:#3b82f6; display:flex; align-items:center;
            justify-content:center; box-shadow:0 0 16px rgba(59,130,246,0.6);
            font-size:20px;
          ">🚌</div>
        </div>
        <style>
          @keyframes ping {
            75%, 100% { transform:scale(2); opacity:0; }
          }
        </style>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
    })

    markerRef.current = L.marker([bus.lat, bus.lng], { icon: busIcon })
      .addTo(map)
      .bindPopup(`<b>${bus.routeNumber}</b><br/>Driver: ${bus.driverName}`)

    // Fit map to show full route
    const bounds = L.latLngBounds(routeCoords)
    map.fitBounds(bounds, { padding: [40, 40] })

    return () => {
      map.remove()
      mapInstanceRef.current = null
      markerRef.current = null
      initializedRef.current = false
    }
  }, [])

  // Step 3: Socket.io live updates — filter by real bus ID
  useEffect(() => {
    socket.on('busLocationUpdate', (data: any) => {
      const now = Date.now()
      if (now - lastUpdateRef.current < 2000) return
      lastUpdateRef.current = now

      if (!markerRef.current || !mapInstanceRef.current) return
      if (!data.lat || !data.lng) return

      // Only update if matches our bus ID
      if (realBusId && data.busId !== realBusId) return

      markerRef.current.setLatLng([data.lat, data.lng])
    })

    return () => {
      socket.off('busLocationUpdate')
    }
  }, [realBusId])

  return (
    <div className="relative h-[55vh] min-h-[300px]">
      <div ref={mapRef} className="absolute inset-0 z-0" />
    </div>
  )
}