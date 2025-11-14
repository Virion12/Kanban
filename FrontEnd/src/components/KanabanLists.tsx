import type { ListElementProps } from "../types/index";
import React, { useState } from "react";
import ListElement from "./ListElement";
import { DndContext, type DragEndEvent, useDroppable } from "@dnd-kit/core";

function DroppableZone({ zoneName, children }: { zoneName: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: zoneName,
  });

  return (
    <div ref={setNodeRef} className="flex flex-col bg-gray-200 p-2 rounded-xl w-64">
      {children}
    </div>
  );
}

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


  const [draggedZone,setDraggedZone] = useState("default");
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragEnd = (event : DragEndEvent) =>{
    const {active, over} = event;

    if(!over) return;

    const taskID = active.id as number;
    const newZone = over.id as ListElementProps["zone"];


    setItems(() => items.map((item) => item.id === taskID ?
    {
      ...item,
      zone: newZone,
    }: item,
    ),
  )
  }
  

  return (
    <div className="">
      <DndContext onDragEnd={handleDragEnd}>
    <div className="flex gap-4 p-4 items-start">
      
      {Object.entries(zones).map(([zoneName, zoneItems]) => (
        <DroppableZone key={zoneName} zoneName={zoneName}>
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
        </DroppableZone>
      ))}
      <div className="flex flex-col bg-gray-200 p-2 rounded-xl w-64 ml-auto">
      <button 
        className="btn btn-square btn-sm hover:bg-red-500 hover:text-white transition-colors" 
        // onClick={onDelete}
        aria-label="Delete item"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
          />
        </svg>
      </button>
    </div>
    </div>
    </DndContext>
    </div>
  );
}