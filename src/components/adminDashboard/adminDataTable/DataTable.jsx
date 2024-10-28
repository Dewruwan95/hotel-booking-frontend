import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function DataTable({
  columns,
  fields,
  data,
  deleteElement,
  elementIdentifier,
}) {
  console.log(data);

  return (
    <>
      <div className="w-full h-full p-[20px] bg-purple-200 rounded-tl-[10px]">
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
                  deleteElement={deleteElement}
                  elementIdentifier={elementIdentifier}
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
