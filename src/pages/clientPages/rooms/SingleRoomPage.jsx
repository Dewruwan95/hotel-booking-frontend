import { useLocation } from "react-router-dom";
import SingleRoom from "../../../components/roomsPage/SingleRoom";

function SingleRoomPage() {
  const location = useLocation();
  const room = location.state.room;

  return (
    <>
      <div className="mt-[70px] lg:mt-[100px] xl:mt-[120px] min-h-screen mb-[100px]">
        <SingleRoom room={room} />
      </div>
    </>
  );
}

export default SingleRoomPage;
