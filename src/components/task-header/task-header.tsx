interface HeaderProps {
  title: string;
  taskCount: number;
  onAdd: () => void;
}

const TaskHeader = ({ title, taskCount, onAdd }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex font-bold items-center justify-between">
        <span className="mr-2 text-stone-600">{title}{" "}</span>
        <div className="flex justify-center items-center h-5 w-5 rounded-xl font-light text-sm text-indigo-400 bg-indigo-200">
          {taskCount}
        </div>
      </h2>
      <button
        onClick={onAdd}
        className="flex justify-center items-center text-stone-600 rounded border border-solid border-stone-600 h-6 w-6"
      >
        +
      </button>
    </div>
  );
};

export { TaskHeader };
