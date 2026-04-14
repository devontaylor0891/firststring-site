import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Screenshot {
  label: string;
  number: number;
}

@Component({
  selector: 'app-screenshots',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './screenshots.component.html',
  styleUrl: './screenshots.component.scss',
})
export class ScreenshotsComponent {

  screenshots: Screenshot[] = [
    { label: 'Team Roster', number: 1 },
    { label: 'Game Schedule', number: 2 },
    { label: 'Attendance Tracker', number: 3 },
    { label: 'Messaging Center', number: 4 },
    { label: 'Player Profile', number: 5 },
    { label: 'Season Dashboard', number: 6 },
  ];
}
