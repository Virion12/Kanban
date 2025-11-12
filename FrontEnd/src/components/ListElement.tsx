import type { ListElementProps } from "../types";

export default function ListElement({ isDone, name, onToggle }: ListElementProps) {
  return (
    <div className={`group flex items-center gap-3 mt-2 p-2 rounded-md border-2 hover:border-indigo-600 ${
    isDone ? "bg-blue-200" : "bg-white"
  }`}
  
  >
      <input
        type="checkbox"
        className={`checkbox checkbox-accent checkbox-xs ${isDone ? "visible" : "invisible group-hover:visible"}`}
        id={`checkbox-${name}`}
        checked={isDone}
        onChange={onToggle}
      />
      <label
        htmlFor={`checkbox-${name}`}
        className="font-medium text-gray-700 cursor-pointer"
      >
        {name}
      </label>
    </div>
  );
}
