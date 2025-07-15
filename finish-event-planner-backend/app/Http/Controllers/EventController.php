<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date|after:today',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'image_url' => 'nullable|url',
            'emoji' => 'nullable|string|max:10'
        ]);

        return Event::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $request->validate([
            'title' => 'string|max:255',
            'date' => 'date|after:today',
            'location' => 'string|max:255',
            'description' => 'string',
            'image_url' => 'nullable|url',
            'emoji' => 'nullable|string|max:10'
        ]);

        $event->update($request->all());
        return $event;
    }

    public function destroy($id)
    {
        Event::destroy($id);
        return response()->noContent();
    }
}