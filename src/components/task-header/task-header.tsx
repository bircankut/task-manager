interface HeaderProps {
  title: string;
  taskCount: number;
  onAdd: () => void;
}

const TaskHeader = ({ title, taskCount, onAdd }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold">
        {title} <span className="text-gray-500">({taskCount})</span>
      </h2>
      <button
        onClick={onAdd}
        className="flex justify-center align-middle text-stone-500 rounded border-2 border-solid border-stone-500 h-6 w-6"
      >
        +
      </button>
    </div>
  );
};

export { TaskHeader };
