# Unit Converter

An interactive unit converter built with React and TypeScript that allows conversions between different types of units (length, weight, and temperature) with elegant animations.

## Features

- Conversion between multiple units of measurement
- Intuitive user interface with smooth animations using Motion
- Responsive and attractive design with TailwindCSS
- Form validation with React Hook Form
- REST API for unit conversions

## Technologies Used

- **React 19**: UI Framework
- **TypeScript**: Static typing
- **Motion**: Animation library
- **TailwindCSS 4**: Utility-first CSS framework
- **HeadlessUI**: Accessible UI components
- **React Hook Form**: Form handling and validation
- **Vite**: Build tool and dev server

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd unitConvert

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
src/
  ├── components/      # Reusable UI components
  ├── hooks/           # Custom hooks (includes useUnitConverter)
  ├── types/           # TypeScript definitions
  ├── assets/          # Static resources
  ├── App.tsx          # Main component
  └── main.tsx         # Entry point
```

## API

The project connects to a local API that handles the conversions. The endpoints are:

- `GET /api/converter/units/{unitType}`: Gets available units for a specific type
- `GET /api/converter/{unitType}?value={value}&from={fromUnit}&to={toUnit}`: Performs the conversion

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production version
npm run preview
```

## License

MIT
