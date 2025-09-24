# Finnish Event Planner


<img width="1422" height="767" alt="e1" src="https://github.com/user-attachments/assets/a7a73d4e-3602-4beb-9f2a-643f1de8c6cf" />

A simple web app to create, list, and share events in Finland.  
Hosts can create events; visitors can browse them on a list or map.

## Project Description

Web app to create and manage events (title, date, location, description, image, emoji).  
Shows weather for events within 5 days and places markers on a Leaflet map.

## Features

- Create, edit, and delete events with server-side validation.  
- List view with cards (emoji or image) and optional weather.  
- Map view using Leaflet + Nominatim geocoding.

## Tech Stack

**Backend:** PHP, Laravel, Eloquent, Blade.  
**Frontend:** Next.js (React), TailwindCSS, Leaflet, axios, OpenWeatherMap.

## Installation

### Backend

```bash
# from backend folder
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```
### Frontend
```bash
npm install
cp .env.local.example .env.local
# set env vars in .env.local, then:
npm run dev
```

### Configuration
Add these to your frontend .env.local:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/events
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```

### Usage

- Start backend and frontend.
- Open http://localhost:3000.
- Use the form to create, edit, or delete events; switch between List and Map views.

### Example API (create event)
```bash
curl -X POST $NEXT_PUBLIC_API_URL -H "Content-Type: application/json" \
  -d '{"title":"Sauna Night","date":"2025-10-10","location":"Helsinki, Finland","description":"Chill sauna & snacks"}'
```


### Notes on the code

- `App\Models\Event` uses protected `$fillable` for safe mass-assignment.
- Frontend geocodes locations (Nominatim) and fetches forecasts for events within five days.

## Contributing

- Fork the repo.
- Make small, focused changes.
- Open a pull request with a short description.
- Document any new env vars or DB migrations in the PR.

### License
- MIT — add a LICENSE file and update it with your name and year.
