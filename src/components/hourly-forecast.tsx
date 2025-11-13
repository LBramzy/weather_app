import { Sun, Cloud, CloudRain } from "lucide-react"

interface HourlyData {
  time: string
  temp: number
  icon: string
  condition: string
}

export default function HourlyForecast({ hourlyData }: { hourlyData: HourlyData[] }) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="w-8 h-8 text-accent" />
      case "cloud":
        return <Cloud className="w-8 h-8 text-secondary" />
      case "rain":
        return <CloudRain className="w-8 h-8 text-secondary" />
      default:
        return <Sun className="w-8 h-8 text-accent" />
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border/50 p-6">
      <h3 className="text-xl font-semibold mb-6">Hourly Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <p className="text-sm text-muted-foreground mb-2">{hour.time}</p>
            {getIcon(hour.icon)}
            <p className="text-sm text-muted-foreground mt-2">{hour.condition}</p>
            <p className="text-lg font-semibold mt-1">{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}
