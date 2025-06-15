import { useState } from 'react'
import './App.css';
import { getImageURL } from './utils/image-util';
import { layouts } from './Layout';

function App() {


  // Dummy data
  const towers = [
    { id: 'A', name: 'Tower A' },
    { id: 'B', name: 'Tower B' },
    { id: 'C', name: 'Tower C' },
  ];

  const floors = Array.from({ length: 12 }, (_, i) => 12 - i); // Floors 12 to 1



  const [selectedTower, setSelectedTower] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedLayout, setSelectedLayout] = useState(null);

  // Reset lower selections when higher level changes
  const handleSelectTower = (tower) => {
    setSelectedTower(tower);
    setSelectedFloor(null);
    setSelectedLayout(null);
  };

  const handleSelectFloor = (floor) => {
    setSelectedFloor(floor);
    setSelectedLayout(null);
  };

  const handleSelectLayout = (layout) => {
    setSelectedLayout(layout);
  };

  const handleBack = (level) => {
    if (level === 'tower') {
      setSelectedTower(null);
      setSelectedFloor(null);
      setSelectedLayout(null);
    } else if (level === 'floor') {
      setSelectedFloor(null);
      setSelectedLayout(null);
    } else if (level === 'layout') {
      setSelectedLayout(null);
    }
  };

  return (
    <div className="p-6 mx-auto w-full app">
      <h1 className="bg-gray-600 text-white text-xl p-6 mb-8 flex items-center justify-center font-bold w-full sm:text-4xl">
        <span className='border p-2 mr-3'>propertyVisualizer</span>  Tower Explorer
      </h1>
      {!selectedTower && (
        <div className='w-full h-[80%] flex flex-col gap-2 items-center justify-center'>
          <h2 className="text-lg sm:text-3xl font-bold mb-2 p-2 rounded-lg bg-gray-700 text-white">
            Select a Tower
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {towers.map((tower) => (
              <div
                key={tower.id}
                className="border-2 rounded-lg p-8 cursor-pointer hover:bg-gray-200 text-center sm:p-16"
                onClick={() => handleSelectTower(tower)}
              >
                <div className="text-xl font-bold">{tower.name}</div>
              </div>
            ))}
          </div>
        </div>

      )}

      {selectedTower && !selectedFloor && (
        <div className='w-full h-[80%] flex flex-col gap-4 items-center justify-center'>
          <button
            className="mb-4 text-lg bg-gray-700 text-white hover:bg-gray-600 font-bold underline cursor-pointer p-2 rounded-lg"
            onClick={() => handleBack('tower')}
          >
            &larr; Back to Towers
          </button>
          <h2 className="text-lg sm:text-3xl font-bold mb-2 p-2 rounded-lg bg-gray-700 text-white">
            {selectedTower.name}: Select a Floor
          </h2>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {floors.map((floor) => (
              <div
                key={floor}
                className="border-2 rounded p-4 sm:p-8 cursor-pointer hover:bg-gray-100 text-center font-bold hover:cursor-pointer transition-transform transform hover:translate-x-1 hover:translate-y-1"
                onClick={() => handleSelectFloor(floor)}
              >
                Floor {floor}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTower && selectedFloor && !selectedLayout && (
        <div className='w-full flex flex-col gap-4 items-center justify-center'>
          <button
            className="mb-4 text-lg bg-gray-700 text-white hover:bg-gray-600 font-bold underline cursor-pointer p-2 rounded-lg"
            onClick={() => handleBack('floor')}
          >
            &larr; Back to Floors
          </button>
          <h2 className="text-lg sm:text-3xl font-semibold mb-2 p-2 rounded-lg bg-gray-700 text-white">
            {selectedTower.name} - Floor {selectedFloor}: Select an Apartment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                className="border-2 rounded sm:p-2 cursor-pointer hover:bg-gray-100 flex justify-center items-center hover:cursor-pointer transition-transform transform hover:translate-x-1 hover:translate-y-1"
                onClick={() => handleSelectLayout(layout)}
              >
                <img
                  src={getImageURL(layout.image)}
                  alt="Layout thumbnail"
                  className="w-24 h-24 object-cover mr-3 rounded sm:w-46 sm:h-46"
                />
                <div>
                  <div className="font-bold">{layout.unitType}</div>
                  <div className="font-bold">Area: {layout.area}</div>
                  <div className="font-bold">Rooms: {layout.rooms}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTower && selectedFloor && selectedLayout && (
        <div className='w-full flex flex-col gap-4 items-center justify-center'>
          <button
            className="mb-4 text-lg bg-gray-700 text-white hover:bg-gray-600 font-bold underline cursor-pointer p-2 rounded-lg"
            onClick={() => handleBack('layout')}
          >
            &larr; Back to Layouts
          </button>
          <h2 className="text-lg sm:text-3xl font-semibold mb-2 p-2 rounded-lg bg-gray-700 text-white">
            {selectedTower.name} - Floor {selectedFloor} - {selectedLayout.unitType}
          </h2>
          <div className='flex flex-col items-left '>
            <img
              src={getImageURL(selectedLayout.image)}
              alt="Layout large"
              className="w-full max-w-md mb-4 rounded hover:shadow-2xl"
            />
            <div className="mb-2 font-bold">Area: {selectedLayout.area}</div>
            <div className="mb-2 font-bold">Unit Type: {selectedLayout.unitType}</div>
            <div className="mb-2 font-bold">Rooms: {selectedLayout.rooms}</div>
          </div>

        </div>
      )}
    </div>
  )
}

export default App
