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

  return (
    <div className="flex gap-4 p-4">
      {Object.entries(zones).map(([zoneName, zoneItems]) => (
        <div key={zoneName} className="flex flex-col bg-gray-200 p-2 rounded-xl w-64">
          <span className="font-bold mb-2">{zoneName}</span>
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
        </div>
      ))}
    </div>
  );
}
