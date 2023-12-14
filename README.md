# Sleeptracker App

## Description

Ionic SleepTracker is an application developed using Ionic and Angular frameworks, designed to log and track sleep patterns and sleepiness levels. Utilizing Capacitor for local storage, this app offers a user-friendly interface to record and analyze sleep data.

## Structure

- `data` folder:

  - `sleep-data.ts`: Base class for sleep data structures.
  - `overnight-sleep-data.ts`: Subclass for logging overnight sleep data.
  - `stanford-sleepiness-data.ts`: Subclass for logging sleepiness data.

- `services` folder:
  - `sleep.service.ts`: Service containing static variables for data storage and method for loading default data.

## Usage

- Log sleep by entering the start and end time of your sleep.
- Record your sleepiness level at any time during the day.
- View and analyze your sleep and sleepiness data through the app interface.
