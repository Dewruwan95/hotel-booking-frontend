import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function DataTable(props) {
  return (
    <>
      <div className="w-full h-full p-[20px] bg-purple-200">
        <div className="w-full h-full overflow-y-scroll rounded-[10px]">
          <table className="w-full">
            {/* Pass the column headers as props */}
            <TableHeader columns={props.columns} />
            <tbody>
              {props.data.map((row, index) => (
                <TableRow key={index} row={row} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DataTable;
