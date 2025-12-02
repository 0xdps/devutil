import { useState, useEffect, useMemo, useRef } from 'react'
import toast from 'react-hot-toast'
import SEO from '../components/SEO'
import { toolsMetadata } from '../config/seoConfig'

type TimezoneInfo = {
  id: string
  timezone: string
  label: string
  city: string
  country?: string
}

// Comprehensive timezone list with major cities
const ALL_TIMEZONES = [
  // Americas
  { value: 'America/New_York', city: 'New York', country: 'United States', region: 'Americas' },
  { value: 'America/Chicago', city: 'Chicago', country: 'United States', region: 'Americas' },
  { value: 'America/Denver', city: 'Denver', country: 'United States', region: 'Americas' },
  { value: 'America/Los_Angeles', city: 'Los Angeles', country: 'United States', region: 'Americas' },
  { value: 'America/Toronto', city: 'Toronto', country: 'Canada', region: 'Americas' },
  { value: 'America/Vancouver', city: 'Vancouver', country: 'Canada', region: 'Americas' },
  { value: 'America/Mexico_City', city: 'Mexico City', country: 'Mexico', region: 'Americas' },
  { value: 'America/Sao_Paulo', city: 'São Paulo', country: 'Brazil', region: 'Americas' },
  { value: 'America/Buenos_Aires', city: 'Buenos Aires', country: 'Argentina', region: 'Americas' },
  { value: 'America/Lima', city: 'Lima', country: 'Peru', region: 'Americas' },
  { value: 'America/Bogota', city: 'Bogotá', country: 'Colombia', region: 'Americas' },
  { value: 'America/Santiago', city: 'Santiago', country: 'Chile', region: 'Americas' },
  // Europe
  { value: 'Europe/London', city: 'London', country: 'United Kingdom', region: 'Europe' },
  { value: 'Europe/Paris', city: 'Paris', country: 'France', region: 'Europe' },
  { value: 'Europe/Berlin', city: 'Berlin', country: 'Germany', region: 'Europe' },
  { value: 'Europe/Rome', city: 'Rome', country: 'Italy', region: 'Europe' },
  { value: 'Europe/Madrid', city: 'Madrid', country: 'Spain', region: 'Europe' },
  { value: 'Europe/Amsterdam', city: 'Amsterdam', country: 'Netherlands', region: 'Europe' },
  { value: 'Europe/Brussels', city: 'Brussels', country: 'Belgium', region: 'Europe' },
  { value: 'Europe/Vienna', city: 'Vienna', country: 'Austria', region: 'Europe' },
  { value: 'Europe/Zurich', city: 'Zurich', country: 'Switzerland', region: 'Europe' },
  { value: 'Europe/Stockholm', city: 'Stockholm', country: 'Sweden', region: 'Europe' },
  { value: 'Europe/Oslo', city: 'Oslo', country: 'Norway', region: 'Europe' },
  { value: 'Europe/Copenhagen', city: 'Copenhagen', country: 'Denmark', region: 'Europe' },
  { value: 'Europe/Helsinki', city: 'Helsinki', country: 'Finland', region: 'Europe' },
  { value: 'Europe/Warsaw', city: 'Warsaw', country: 'Poland', region: 'Europe' },
  { value: 'Europe/Prague', city: 'Prague', country: 'Czech Republic', region: 'Europe' },
  { value: 'Europe/Budapest', city: 'Budapest', country: 'Hungary', region: 'Europe' },
  { value: 'Europe/Athens', city: 'Athens', country: 'Greece', region: 'Europe' },
  { value: 'Europe/Lisbon', city: 'Lisbon', country: 'Portugal', region: 'Europe' },
  { value: 'Europe/Dublin', city: 'Dublin', country: 'Ireland', region: 'Europe' },
  { value: 'Europe/Moscow', city: 'Moscow', country: 'Russia', region: 'Europe' },
  { value: 'Europe/Istanbul', city: 'Istanbul', country: 'Turkey', region: 'Europe' },
  // Asia
  { value: 'Asia/Dubai', city: 'Dubai', country: 'United Arab Emirates', region: 'Asia' },
  { value: 'Asia/Riyadh', city: 'Riyadh', country: 'Saudi Arabia', region: 'Asia' },
  { value: 'Asia/Tehran', city: 'Tehran', country: 'Iran', region: 'Asia' },
  { value: 'Asia/Karachi', city: 'Karachi', country: 'Pakistan', region: 'Asia' },
  { value: 'Asia/Kolkata', city: 'Mumbai', country: 'India', region: 'Asia' },
  { value: 'Asia/Dhaka', city: 'Dhaka', country: 'Bangladesh', region: 'Asia' },
  { value: 'Asia/Bangkok', city: 'Bangkok', country: 'Thailand', region: 'Asia' },
  { value: 'Asia/Singapore', city: 'Singapore', country: 'Singapore', region: 'Asia' },
  { value: 'Asia/Kuala_Lumpur', city: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia' },
  { value: 'Asia/Jakarta', city: 'Jakarta', country: 'Indonesia', region: 'Asia' },
  { value: 'Asia/Manila', city: 'Manila', country: 'Philippines', region: 'Asia' },
  { value: 'Asia/Hong_Kong', city: 'Hong Kong', country: 'Hong Kong', region: 'Asia' },
  { value: 'Asia/Shanghai', city: 'Shanghai', country: 'China', region: 'Asia' },
  { value: 'Asia/Beijing', city: 'Beijing', country: 'China', region: 'Asia' },
  { value: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan', region: 'Asia' },
  { value: 'Asia/Seoul', city: 'Seoul', country: 'South Korea', region: 'Asia' },
  { value: 'Asia/Taipei', city: 'Taipei', country: 'Taiwan', region: 'Asia' },
  // Africa
  { value: 'Africa/Cairo', city: 'Cairo', country: 'Egypt', region: 'Africa' },
  { value: 'Africa/Johannesburg', city: 'Johannesburg', country: 'South Africa', region: 'Africa' },
  { value: 'Africa/Lagos', city: 'Lagos', country: 'Nigeria', region: 'Africa' },
  { value: 'Africa/Nairobi', city: 'Nairobi', country: 'Kenya', region: 'Africa' },
  { value: 'Africa/Casablanca', city: 'Casablanca', country: 'Morocco', region: 'Africa' },
  // Oceania
  { value: 'Australia/Sydney', city: 'Sydney', country: 'Australia', region: 'Oceania' },
  { value: 'Australia/Melbourne', city: 'Melbourne', country: 'Australia', region: 'Oceania' },
  { value: 'Australia/Brisbane', city: 'Brisbane', country: 'Australia', region: 'Oceania' },
  { value: 'Australia/Perth', city: 'Perth', country: 'Australia', region: 'Oceania' },
  { value: 'Pacific/Auckland', city: 'Auckland', country: 'New Zealand', region: 'Oceania' },
  // UTC
  { value: 'UTC', city: 'UTC', country: 'UTC', region: 'UTC' },
]

// Get all available timezones from Intl API and merge with our list
const getAllAvailableTimezones = (): typeof ALL_TIMEZONES => {
  try {
    // Check if supportedValuesOf is available (newer browsers)
    if (typeof (Intl as any).supportedValuesOf === 'function') {
      const supported = (Intl as any).supportedValuesOf('timeZone') as string[]
      const known = new Set(ALL_TIMEZONES.map((tz: { value: string }) => tz.value))
      
      // Add any additional timezones from Intl API that we don't have
      supported.forEach((tz: string) => {
        if (!known.has(tz)) {
          const parts = tz.split('/')
          const city = parts[parts.length - 1].replace(/_/g, ' ')
          ALL_TIMEZONES.push({
            value: tz,
            city,
            country: parts[0] || 'Unknown',
            region: parts[0] || 'Other',
          })
        }
      })
    }
  } catch (e) {
    // Fallback to our list if Intl.supportedValuesOf is not available
  }
  
  return ALL_TIMEZONES
}

const STORAGE_KEY = 'devutil-timezones'
const DEFAULT_TIMEZONES = [
  { value: 'Asia/Kolkata', city: 'Mumbai', country: 'India' },
  { value: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan' },
  { value: 'America/New_York', city: 'New York', country: 'United States' },
  { value: 'Europe/Moscow', city: 'Moscow', country: 'Russia' },
]

// Load timezones from localStorage or return defaults
const loadTimezones = (): TimezoneInfo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    // Fallback to defaults if parsing fails
  }
  
  // Return default timezones
  return DEFAULT_TIMEZONES.map((tz, index) => ({
    id: `${tz.value}-${index}`,
    timezone: tz.value,
    label: `${tz.city} (${tz.value})`,
    city: tz.city,
    country: tz.country,
  }))
}

export default function TimezoneCompare() {
  const meta = toolsMetadata.timezoneCompare
  const [timezones, setTimezones] = useState<TimezoneInfo[]>(() => loadTimezones())
  const [currentTimes, setCurrentTimes] = useState<Record<string, { time: string; date: string; day: string; hour: number; minute: number }>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date()
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
    }
  })
  
  const allTimezones = useMemo(() => getAllAvailableTimezones(), [])
  const searchRef = useRef<HTMLDivElement>(null)
  
  // Filter timezones based on search query
  const filteredTimezones = useMemo(() => {
    if (!searchQuery.trim()) return allTimezones.slice(0, 20) // Show top 20 when no search
    
    const query = searchQuery.toLowerCase()
    return allTimezones.filter(tz => 
      tz.city.toLowerCase().includes(query) ||
      tz.country.toLowerCase().includes(query) ||
      tz.value.toLowerCase().includes(query) ||
      tz.region.toLowerCase().includes(query)
    ).slice(0, 20) // Limit to 20 results
  }, [searchQuery, allTimezones])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Persist timezones to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones))
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [timezones])

  // Update times based on selected time (no real-time updates)
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, { time: string; date: string; day: string; hour: number; minute: number }> = {}
      
      // Create a UTC date with selected date and time
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const day = selectedDate.getDate()
      const utcDate = new Date(Date.UTC(year, month, day, selectedTime.hours, selectedTime.minutes, 0, 0))
      
      timezones.forEach((tz) => {
        try {
          // Get the time in the target timezone
          const timeFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
          const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            month: 'short',
            day: 'numeric',
          })
          const dayFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            weekday: 'short',
          })
          const hour24Formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz.timezone,
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })
          
          // Format the UTC date in the target timezone
          const timeStr = timeFormatter.format(utcDate)
          const dateStr = dateFormatter.format(utcDate)
          const dayStr = dayFormatter.format(utcDate)
          const hour24Str = hour24Formatter.format(utcDate)
          const [hour, minute] = hour24Str.split(':').map(Number)
          
          times[tz.id] = {
            time: timeStr,
            date: dateStr,
            day: dayStr,
            hour: hour || 0,
            minute: minute || 0,
          }
        } catch (error) {
          times[tz.id] = {
            time: 'Invalid',
            date: '',
            day: '',
            hour: 0,
            minute: 0,
          }
        }
      })
      
      setCurrentTimes(times)
    }

    updateTimes()
  }, [timezones, selectedDate, selectedTime])

  const getTimezoneOffset = (timezone: string): string => {
    try {
      const now = new Date()
      const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
      const tz = new Date(now.toLocaleString('en-US', { timeZone: timezone }))
      const offset = (tz.getTime() - utc.getTime()) / (1000 * 60 * 60)
      
      const sign = offset >= 0 ? '+' : '-'
      const hours = Math.abs(Math.floor(offset))
      const minutes = Math.abs((offset % 1) * 60)
      
      return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    } catch {
      return 'UTC+00:00'
    }
  }

  const getTimezoneAbbreviation = (timezone: string): string => {
    try {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'short',
      })
      const parts = formatter.formatToParts(now)
      const tzName = parts.find((part) => part.type === 'timeZoneName')?.value || ''
      return tzName
    } catch {
      return ''
    }
  }

  const addTimezoneByValue = (timezoneValue: string) => {
    if (!timezoneValue) {
      toast.error('Please select a timezone')
      return
    }

    const exists = timezones.some((tz) => tz.timezone === timezoneValue)
    if (exists) {
      toast.error('This timezone is already added')
      return
    }

    const tzData = allTimezones.find((tz) => tz.value === timezoneValue)
    if (!tzData) {
      toast.error('Invalid timezone')
      return
    }

    const newTimezone: TimezoneInfo = {
      id: `${timezoneValue}-${Date.now()}`,
      timezone: timezoneValue,
      label: `${tzData.city} (${getTimezoneAbbreviation(timezoneValue)})`,
      city: tzData.city,
      country: tzData.country,
    }

    setTimezones([...timezones, newTimezone])
    toast.success(`Added ${newTimezone.city}`)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleSearchSelect = (timezoneValue: string) => {
    addTimezoneByValue(timezoneValue)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredTimezones.length === 0) {
      if (e.key === 'Enter' && searchQuery && filteredTimezones.length > 0) {
        handleSearchSelect(filteredTimezones[0].value)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) => 
          prev < filteredTimezones.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredTimezones.length) {
          handleSearchSelect(filteredTimezones[highlightedIndex].value)
        } else if (filteredTimezones.length > 0) {
          handleSearchSelect(filteredTimezones[0].value)
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowSuggestions(false)
        setHighlightedIndex(-1)
        break
    }
  }

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [searchQuery])

  const removeTimezone = (id: string) => {
    setTimezones(timezones.filter((tz) => tz.id !== id))
    toast.success('Timezone removed')
  }

  const getHourColor = (hour: number): string => {
    // Night: 11 PM - 6 AM (23, 0-6)
    if (hour >= 23 || hour < 6) {
      return 'bg-blue-900/30 dark:bg-blue-900/50'
    }
    // Day: 7 AM - 5 PM (7-17)
    if (hour >= 7 && hour < 18) {
      return 'bg-amber-200/50 dark:bg-amber-900/30'
    }
    // Dawn/Dusk: 6 AM, 6 PM - 10 PM (6, 18-22)
    return 'bg-blue-700/20 dark:bg-blue-800/40'
  }

  const renderTimeline = (tz: TimezoneInfo) => {
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const timeInfo = currentTimes[tz.id]
    if (!timeInfo) return null

    // Calculate which hour column to highlight (current hour in this timezone)
    const highlightHour = timeInfo.hour

    return (
      <div className="relative mt-2">
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {hours.map((hour) => {
            const isHighlighted = hour === highlightHour
            const hourLabel = hour === 0 ? '12a' : hour < 12 ? `${hour}a` : hour === 12 ? '12p' : `${hour - 12}p`
            
            return (
              <div
                key={hour}
                className={`relative flex-shrink-0 w-10 h-12 rounded text-xs ${
                  getHourColor(hour)
                } ${isHighlighted ? 'ring-1 ring-primary-500' : ''}`}
              >
                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[9px] font-medium text-gray-600 dark:text-gray-400">
                  {hourLabel}
                </div>
                {isHighlighted && (
                  <div className="absolute inset-0 border border-dashed border-primary-500 rounded"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Generate date options for the next 7 days
  const getDateOptions = () => {
    const dates = []
    const today = new Date()
    for (let i = -1; i <= 5; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }


  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonical={meta.canonical}
        toolName={meta.toolName}
        toolDescription={meta.toolDescription}
        toolUrl={meta.canonical}
      />
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Compact Top Bar */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div ref={searchRef} className="flex-1 min-w-[200px] relative">
              <input
                type="text"
                placeholder="+ Place or timezone"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {showSuggestions && searchQuery && filteredTimezones.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredTimezones.map((tz, index) => (
                    <button
                      key={tz.value}
                      onClick={() => handleSearchSelect(tz.value)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                        index === highlightedIndex
                          ? 'bg-primary-100 dark:bg-primary-900/30'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className={`font-medium ${
                        index === highlightedIndex
                          ? 'text-primary-900 dark:text-primary-100'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {tz.city}
                      </div>
                      <div className={`text-xs ${
                        index === highlightedIndex
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {tz.country} • {tz.value}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Date Selector - Compact */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1">
              {getDateOptions().map((date, i) => {
                const isSelected = date.toDateString() === selectedDate.toDateString()
                const isToday = date.toDateString() === new Date().toDateString()
                const day = date.getDate()
                const month = date.toLocaleString('en-US', { month: 'short' })
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    title={isToday ? 'Today' : `${month} ${day}`}
                  >
                    {isToday ? 'Today' : day === new Date().getDate() && i === 0 ? month : day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Compact Timezone List */}
        {timezones.length > 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            {/* Time Slider at Top */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Time:
                </label>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1439"
                    value={selectedTime.hours * 60 + selectedTime.minutes}
                    onChange={(e) => {
                      const totalMinutes = parseInt(e.target.value)
                      setSelectedTime({
                        hours: Math.floor(totalMinutes / 60),
                        minutes: totalMinutes % 60,
                      })
                    }}
                    className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="text-sm font-mono text-gray-900 dark:text-white min-w-[80px] text-right">
                    {String(selectedTime.hours).padStart(2, '0')}:{String(selectedTime.minutes).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
            
            {timezones.map((tz, index) => {
              const timeInfo = currentTimes[tz.id]
              const tzAbbr = getTimezoneAbbreviation(tz.timezone)
              const offset = getTimezoneOffset(tz.timezone)
              const offsetNum = offset.replace('UTC', '').replace(':', '')
              
              return (
                <div
                  key={tz.id}
                  className={`border-b border-gray-200 dark:border-gray-700 last:border-0 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/30 dark:bg-gray-800/30'
                  }`}
                >
                  <div className="p-3">
                    <div className="flex items-start gap-3">
                      {/* Remove button */}
                      <button
                        onClick={() => removeTimezone(tz.id)}
                        className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                        aria-label="Remove timezone"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Left: Timezone Info and Time */}
                      <div className="flex-shrink-0 min-w-[200px]">
                        <div className="flex items-baseline gap-3 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                            {tz.city}
                          </h3>
                          {timeInfo && (
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                              {timeInfo.time}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            {tzAbbr || offset}
                          </span>
                          {offsetNum && offsetNum !== '+00:00' && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {offsetNum}
                            </span>
                          )}
                          {timeInfo && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {timeInfo.day}, {timeInfo.date}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tz.country}
                        </p>
                      </div>

                      {/* Right: Timeline */}
                      <div className="flex-1 min-w-0">
                        {renderTimeline(tz)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-8 text-center">
            <div className="text-4xl mb-2">🌍</div>
            <p className="text-gray-600 dark:text-gray-400">
              No timezones added yet. Add timezones above to start comparing.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

