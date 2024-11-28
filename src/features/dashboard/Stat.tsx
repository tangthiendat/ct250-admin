interface StatProps {
  name: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
  className?: string;
}

const Stat: React.FC<StatProps> = ({ name, value, unit, icon, className }) => {
  return (
    <div
      className={`flex w-auto items-center gap-1 rounded-lg bg-white py-1 ${className}`}
    >
      <div className="flex w-[25%] items-center justify-center py-3">
        {icon}
      </div>
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="text-sm font-semibold uppercase text-gray-600">
          {name}
        </div>
        <div className="text-2xl font-semibold">
          {value} {unit || ""}
        </div>
      </div>
    </div>
  );
};

export default Stat;
