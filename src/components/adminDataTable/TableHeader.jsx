function TableHeader({ columns }) {
  return (
    <>
      <thead>
        <tr className="bg-purple-600 text-white sticky top-0 z-10">
          {columns.map((column, index) => (
            <th key={index} className="py-3 px-6 text-center">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
