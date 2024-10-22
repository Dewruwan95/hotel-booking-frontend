import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function DataTable({ columns, fields, data }) {
  return (
    <>
      <div className="w-full h-full p-[20px] bg-purple-200">
        <div className="w-full h-full overflow-y-scroll rounded-[10px]">
          <table className="w-full">
            {/* Reusable TableHeader */}
            <TableHeader columns={columns} />
            <tbody>
              {/* Render rows dynamically based on fields */}
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  fields={fields}
                  data={item}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DataTable;
