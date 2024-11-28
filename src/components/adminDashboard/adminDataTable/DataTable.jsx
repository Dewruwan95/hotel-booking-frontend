import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function DataTable({
  columns,
  fields,
  data,
  deleteElement,
  editElementPath,
  elementIdentifier,
}) {
  return (
    <>
      <div className="w-full h-[90%] p-[20px] bg-purple-200 rounded-tl-[10px]">
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
                  editElementPath={editElementPath}
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
