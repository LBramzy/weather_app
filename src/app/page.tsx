"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Cloud, Wind, Droplets, Eye } from "lucide-react"
import WeatherCard from "../components/weather-card"
import HourlyForecast from "../components/hourly-forecast"
import DailyForecast from "../components/daily-forecast"

export default function Home() {
  const [location, setLocation] = useState("San Francisco, CA")
  const [searchInput, setSearchInput] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setLocation(searchInput)
        
      // Fetch data from API based on searchInput
      //  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchInput)}`;
      const url = `https://api.weatherapi.com/v1/current.json?key=c7bfdd17ee2f452fa1084506251311&q=${encodeURIComponent(searchInput)}&aqi=yes`
      // Implement API call and state update here
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setWeatherData(data || [])
        })
        .catch(error => {
          console.error("Error fetching weather data:", error);
        });
      setSearchInput("")
    }
  }

  useEffect(() => {
    if (weatherData) {
      console.log("Updated weatherData state:", weatherData);
    }
  }, [weatherData]);

  // Mock data - replace with real API integration
  const currentWeather = {
    temp: 72,
    condition: "Partly Cloudy",
    high: 78,
    low: 62,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    feelsLike: 70,
  }
    // const currentWeather = weatherData.current 

    const hourlyData = [
      { time: "12:00 PM", temp: 72, icon: "cloud", condition: "Cloudy" },
      { time: "1:00 PM", temp: 74, icon: "sun", condition: "Sunny" },
      { time: "2:00 PM", temp: 76, icon: "sun", condition: "Sunny" },
      { time: "3:00 PM", temp: 75, icon: "cloud", condition: "Cloudy" },
      { time: "4:00 PM", temp: 73, icon: "rain", condition: "Rainy" },
      { time: "5:00 PM", temp: 71, icon: "rain", condition: "Rainy" },
    ]

    const dailyData = [
      { day: "Tomorrow", high: 78, low: 62, icon: "cloud", condition: "Cloudy" },
      { day: "Thursday", high: 75, low: 60, icon: "sun", condition: "Sunny" },
      { day: "Friday", high: 70, low: 58, icon: "rain", condition: "Rainy" },
      { day: "Saturday", high: 72, low: 59, icon: "cloud", condition: "Cloudy" },
      { day: "Sunday", high: 76, low: 63, icon: "sun", condition: "Sunny" },
    ]

    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 font-montserrat-bold">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">Weather Forecast</h1>
            <p className="text-lg text-muted-foreground">Real-time weather updates and forecasts</p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search location..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Location */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Location</p>
            <h2 className="text-2xl font-semibold">{location}</h2>
          </div>

          {/* Current Weather */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <WeatherCard currentWeather={currentWeather} />
            </div>

            {/* Additional Info */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Feels Like</span>
                  <Cloud className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl font-bold">{currentWeather.feelsLike}°F</p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Humidity</span>
                  <Droplets className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl font-bold">{currentWeather.humidity}%</p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Wind Speed</span>
                  <Wind className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl font-bold">{currentWeather.windSpeed} mph</p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Visibility</span>
                  <Eye className="w-5 h-5 text-secondary" />
                </div>
                <p className="text-3xl font-bold">{currentWeather.visibility} mi</p>
              </div>
            </div>
          </div>

          {/* Hourly Forecast */}
          <HourlyForecast hourlyData={hourlyData} />

          {/* Daily Forecast */}
          <DailyForecast dailyData={dailyData} />
        </div>
      </main>
    )
  }
