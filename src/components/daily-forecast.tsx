import { Sun, Cloud, CloudRain } from "lucide-react"

interface DailyData {
  day: string
  high: number
  low: number
  icon: string
  condition: string
}

export default function DailyForecast({ dailyData }: { dailyData: DailyData[] }) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="w-6 h-6 text-accent" />
      case "cloud":
        return <Cloud className="w-6 h-6 text-secondary" />
      case "rain":
        return <CloudRain className="w-6 h-6 text-secondary" />
      default:
        return <Sun className="w-6 h-6 text-accent" />
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border/50 p-6">
      <h3 className="text-xl font-semibold mb-6">5-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium w-20">{day.day}</p>
            <div className="flex items-center gap-2">
              {getIcon(day.icon)}
              <p className="text-sm text-muted-foreground w-16">{day.condition}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold">
                <span className="text-primary">{day.high}°</span>
                <span className="text-muted-foreground ml-2">{day.low}°</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
