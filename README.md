# Unit Convert Project

This project consists of a unit conversion application with a backend developed in Spring Boot (Kotlin) and a frontend developed in React with TypeScript.

This project is inspired by the Unit Converter project idea from [roadmap.sh](https://roadmap.sh/projects/unit-converter).

## Project Structure

```
UnitConvertProject/
├── Backend/        # Spring Boot Application (Kotlin)
│   └── APIUnit/    # API for unit conversion
└── Frontend/       # React/TypeScript Application
    └── unitConvert/ # User interface
```

## Prerequisites

- Java JDK 21
- Gradle
- Node.js (18 or higher)
- npm or yarn

## Installation Instructions

### Backend (Spring Boot)

1. Navigate to the backend directory:

   ```
   cd Backend/APIUnit
   ```

2. Build the project:

   ```
   ./gradlew build
   ```

3. Run the application:

   ```
   ./gradlew bootRun
   ```

   The backend will be available at `http://localhost:8080`

### Frontend (React/Vite)

1. Navigate to the frontend directory:

   ```
   cd Frontend/unitConvert
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the application:

   ```
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Using the Application

1. **First start the backend** following the instructions above
2. **Then start the frontend** to use the user interface
3. Access the application from your browser at `http://localhost:5173`

## Technologies Used

- **Backend:** Spring Boot, Kotlin
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind

## Additional Notes

- Make sure the backend is running before starting the frontend
- The API exposes endpoints for unit conversions
- The frontend provides an intuitive interface to use these conversions
