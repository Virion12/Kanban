import type { ListElementProps } from "../types/index";
import React, { useState } from "react";
import ListElement from "./ListElement";

export default function List() {
  const [items, setItems] = useState<ListElementProps[]>([
    {id:1, isDone: true, name: "Kup mleko", description: "Pójść do sklepu i kupić mleko", zone: "source" },
    {id:2, isDone: false, name: "Nauczyć się React", description: "Przerobić tutorial na TSX", zone: "source" },
    {id:3, isDone: false, name: "Zrobić obiad", description: "Przygotować spaghetti", zone: "target" },
    {id:4, isDone: false, name: "Posprzątać pokój", description: "Odkurzyć i poukładać rzeczy", zone: "target" },
  ]);

  const zones = items.reduce<Record<string, ListElementProps[]>>((acc, item) => {
    const zoneKey = item.zone as string;
    if (!acc[zoneKey]) acc[zoneKey] = [];
    acc[zoneKey].push(item);
    return acc;
  }, {});



  const [activeInput, setActiveInput] = useState<string>("");                             
  const getValueFromInput = (inputText: string)=>{
    setActiveInput(inputText);
  };

  const handleAdditionToList = () => {
    
    setItems([
      ...items,
      {id: items.length +1,isDone:false,name: activeInput,description:"asd",zone:activeZone,}
    ]);
    setActiveInput("");
  };
  

  const [activeZone, setActiveZone] = useState<string>("");
  

  return (
    <div className="flex gap-4 p-4 items-start">
      {Object.entries(zones).map(([zoneName, zoneItems]) => (
        <div key={zoneName} className="flex flex-col bg-gray-200 p-2 rounded-xl w-64" id={zoneName}>
          <div className="flex justify-between">
            <span className="ml-1 mb-2 text-2xl">{zoneName}</span>
            <span className="mr-1 mb-2 text-2xl">...</span>
          </div>
          {zoneItems.map((item, index) => (
            <ListElement
              key={index}
              id={item.id}
              isDone={item.isDone}
              name={item.name}
              description={item.description}
              onToggle={() => {
                const newItems = [...items];
                newItems.find(i => i.id === item.id)!.isDone = !item.isDone;
                setItems(newItems);
              }}
              onDelete={() => {
                const newItems = items.filter(e => e.id !== item.id);
                setItems(newItems);
              }}
            />
          ))}
          <textarea 
            className={`textarea mt-3 min-h-3 p-2 resize-none ${activeZone === zoneName ? '' : 'hidden'}`}
            placeholder="Bio"
            value={activeInput}
            onChange={e => setActiveInput(e.target.value)}
            
          />
          <button 
            className={`btn h-10 btn-wide mt-4 btn-active bg-blue-500 text-white ${activeZone === zoneName ? 'hidden' : ''}`} onClick={() => setActiveZone(zoneName)}
          >
            Add New
          </button>
          <div className={`flex justify-evenly ${activeZone === zoneName ? '' : 'hidden'}`}>
            <button className="`btn h-10 w-2/5 rounded-md mt-4 btn-active bg-blue-500 text-white" onClick={() => handleAdditionToList()}>Save</button>
            <button className="`btn h-10 w-2/5 rounded-md mt-4 btn-active bg-red-500 text-white" onClick={() => {setActiveZone('default')}}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
}