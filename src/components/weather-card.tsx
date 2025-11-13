import { Cloud } from "lucide-react"

interface CurrentWeatherProps {
  temp: number 
  condition: string
  high: number
  low: number
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  feelsLike: number
}

export default function WeatherCard({ currentWeather }: { currentWeather: CurrentWeatherProps }) {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-lg p-8 border border-primary/20">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-90 mb-2">Current Weather</p>
            <p className="text-6xl font-bold">{currentWeather.temp}°</p>
          </div>
          <Cloud className="w-16 h-16 opacity-80" />
        </div>

        <div>
          <p className="text-lg font-semibold">{currentWeather.condition}</p>
          <p className="text-sm opacity-80">
            H: {currentWeather.high}° L: {currentWeather.low}°
          </p>
        </div>
      </div>
    </div>
  )
}
