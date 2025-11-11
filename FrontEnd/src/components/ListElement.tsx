import type { ListElementProps } from "../types";

export default function ListElement({ isDone, name, description, onToggle }: ListElementProps) {
  return (
    <div className="flex gap-2 bg-white m-2 p-2 rounded-xl items-start">
      <label htmlFor={`checkbox-${name}`} className="inline-flex items-start gap-3">
        <input
          type="checkbox"
          className="my-0.5 size-5 rounded border-gray-300 shadow-sm"
          id={`checkbox-${name}`}
          checked={isDone}
          onChange={onToggle} 
        />
        <div>
          <span className="font-medium text-gray-700">{name}</span>
          <p className="mt-0.5 text-sm text-gray-700">{description}</p>
        </div>
      </label>
    </div>
  );
}
