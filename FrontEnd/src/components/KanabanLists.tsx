import type { ListElementProps } from "../types/index";
import React, { useState } from "react";
import ListElement from "./ListElement";

export default function List() {
  const [items, setItems] = useState<ListElementProps[]>([
    { isDone: true, name: "Kup mleko", description: "Pójść do sklepu i kupić mleko", zone: "source" },
    { isDone: false, name: "Nauczyć się React", description: "Przerobić tutorial na TSX", zone: "source" },
    { isDone: false, name: "Zrobić obiad", description: "Przygotować spaghetti", zone: "target" },
    { isDone: false, name: "Posprzątać pokój", description: "Odkurzyć i poukładać rzeczy", zone: "target" },
  ]);

  const zones = items.reduce<Record<string, ListElementProps[]>>((acc, item) => {
    const zoneKey = item.zone as string;
    if (!acc[zoneKey]) acc[zoneKey] = [];
    acc[zoneKey].push(item);
    return acc;
  }, {});

  const [activeZone, setActiveZone] = useState<string>("");
                                   

  const handleShowInput = (zoneName: string) => {
    setActiveZone(zoneName); 
  };

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
              isDone={item.isDone}
              name={item.name}
              description={item.description}
              onToggle={() => {
                const newItems = [...items];
                newItems.find(i => i.name === item.name)!.isDone = !item.isDone;
                setItems(newItems);
              }}
            />
          ))}
          <textarea 
            className={`textarea mt-3 min-h-3 p-2 resize-none ${activeZone === zoneName ? '' : 'hidden'}`}
            placeholder="Bio"
          />
          <button 
            className={`btn h-10 btn-wide mt-4 btn-active bg-blue-500 text-white ${activeZone === zoneName ? 'hidden' : ''}`} onClick={() => setActiveZone(zoneName)}
          >
            Add New
          </button>
          <div className={`flex justify-evenly ${activeZone === zoneName ? '' : 'hidden'}`}>
            <button className="`btn h-10 w-2/5 rounded-md mt-4 btn-active bg-blue-500 text-white">Save</button>
            <button className="`btn h-10 w-2/5 rounded-md mt-4 btn-active bg-red-500 text-white" onClick={() => {setActiveZone('default')}}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
}