import RoomCard from "../../../components/roomsPage/RoomCard";
import axios from "axios";
import { useEffect, useState } from "react";
import DataPagination from "../../../components/pagination/DataPagination";
function RoomsPage({ categoriesData }) {
  const [roomsData, setRoomsData] = useState([]);
  const [roomsWithCategory, setRoomsWithCategory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (!roomsData.length) {
      fetchRoomsData();
    }
  });

  useEffect(() => {
    if (roomsData.length > 0) {
      combineRoomsAndCategories();
    }
  }, [roomsData]);

  useEffect(() => {
    fetchRoomsData();
  }, [page, pageSize]);

  // fetch rooms data
  async function fetchRoomsData() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/all`,
        { page: page, pageSize: pageSize },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setRoomsData(res.data.rooms);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    }
  }

  // combine rooms with categories
  function combineRoomsAndCategories() {
    const combinedData = roomsData.map((room) => {
      const category = categoriesData.find(
        (category) => category.name == room.category
      );

      return { ...room, categoryData: category || null };
    });

    console.log(combinedData);

    setRoomsWithCategory(combinedData);
  }

  return (
    <>
      <div className="mt-[70px] lg:mt-[100px] xl:mt-[120px] h-hull mb-[100px]">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsWithCategory.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>

        <div className="mt-[100px]">
          <DataPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </>
  );
}

export default RoomsPage;
