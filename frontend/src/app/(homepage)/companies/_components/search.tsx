interface IProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}
export default function Search({ value, onChange, onSearch }: IProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-2 p-4 py-12">
      <p className="text-start">Have an employer in mind?</p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 p-2 border border-gray-200 bg-gray-100 rounded-full"
          placeholder="Search for a company"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          Search
        </button>
      </div>
    </div>
  );
}
