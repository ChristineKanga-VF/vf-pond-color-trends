import React, { useState } from "react";

const colors = [
  { name: "Sea Nettle", code: "#8A8B54" },
  { name: "Emerald Delight 4", code: "#41AA7D" },
  { name: "Crushed Pine 2", code: "#5B9A70" },
  { name: "Mountain Moss", code: "#968A3B" },
  { name: "Celtic Forest 1", code: "#817D59" },
  { name: "Jungle Fever 1", code: "#75845D" },
  { name: "Parrots Plume", code: "#71A63F" },
  { name: "Guild Green", code: "#777B5B" },
  { name: "English Mist 1", code: "#777B5B" },
  { name: "Forest Falls 1", code: "#1CAD78" },
  { name: "Goosebery Fool 1", code: "#787256" },
  { name: "Rainforest Canopy", code: "#888C29" },
  { name: "Woodland Fern 3", code: "#6D9736" },
  { name: "Grecian Spa 1", code: "#00AA8F" },
  { name: "Woodland Pearl 1", code: "#65775B" },
  { name: "Minted Glory 4", code: "#00A58D" },
  { name: "Jade Cluster 4", code: "#00AD85" },
  { name: "Soft Fauna 1", code: "#517367" },
  { name: "Highland Falls 1", code: "#57725E" },
  { name: "Celtic Moor 1", code: "#648637" },
  { name: "Nordic Hills", code: "#6C6B3E" },
  { name: "Tuscan Glade 1", code: "#536C51" },
  { name: "Japanese Maze1", code: "#527143" },
  { name: "Wild Cactus", code: "#636040" },
  { name: "Moorland Magic 1", code: "#497839" },
  { name: "Crushed Pine 1", code: "#34794D" },
  { name: "Dublic Bay 3", code: "#2E8F3D" },
  { name: "Lush Grass", code: "#2E8F3D" },
  { name: "Minted Glory 3", code: "#008571" },
  { name: "Turquoise Copper", code: "#007F74" },
  { name: "Emerald Delight 2", code: "#207856" },
  { name: "LLB Perfect Peacock", code: "#39595B" },
  { name: "Jade Cluster 3", code: "#008763" },
  { name: "Peppermint Beach 1", code: "#008466" },
  { name: "Woodland Fern 2", code: "#466A39" },
  { name: "Emerald Delight 3", code: "#008F54" },
  { name: "Nina's Green", code: "#524E3F" },
  { name: "Jade Cluster 2", code: "#007C5C" },
  { name: "Fortune Green", code: "#007067" },
  { name: "Paradise Green 2", code: "#1F7042" },
  { name: "Vine Leaf", code: "#3B6035" },
  { name: "Amazon Jungle 1", code: "#346437" },
  { name: "Fresh Pine", code: "#23693B" },
  { name: "Minted Glory 2", code: "#0D6456" },
  { name: "Dublic Bay 2", code: "#266A34" },
  { name: "Paradise Green 1", code: "#2B5C3D" },
  { name: "Woodland Fern 1", code: "#32523D" },
  { name: "Indian Ivy 1", code: "#3D512B" },
  { name: "Forest Festival", code: "#03664F" },
  { name: "Everglade Forest", code: "#304B38" },
  { name: "Pine Needle", code: "#2A493F" },
  { name: "Palm Night", code: "#384137" },
  { name: "Dublin Bay 1", code: "#19563E" },
  { name: "Alpine View", code: "#2D3D39" },
  { name: "Emerald Delight 1", code: "#025E42" },
  { name: "Jade Cluster 1", code: "#005345" },
  { name: "Minted Glory 1", code: "#00533F" },
];

const ColorPalette = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color) => {
    if (selectedColor && selectedColor.code === color.code) {
      setSelectedColor(null);
    } else {
      setSelectedColor(color);
    }
  };

  return (
    <div className="p-4">
      {/* show color div */}
      <div className="lg:col-span-full md:col-span-1">
        {selectedColor && (
          <div className="mb-4 p-4 border rounded shadow">
            <div
              className="w-full h-16 mb-2"
              style={{ backgroundColor: selectedColor.code }}
            ></div>
            <div className="text-lg font-bold">{selectedColor.name}</div>
            <div className="text-sm">{selectedColor.code}</div>
          </div>
        )}
      </div>

      {/* color palette div */}
      <div className="mt-10 grid col-span-full md:col-span-4">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {colors.map((color, index) => (
            <div
              key={index}
              className="p-4 cursor-pointer border rounded shadow hover:opacity-75"
              style={{ backgroundColor: color.code }}
              onClick={() => handleColorClick(color)}
            >
              <div className="text-xs text-white text-center mt-2">
                {color.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
