import ListofOrchid from "./ListofOrchid";
import TestCount from "./TestCount";
import { useMemo, useState, useEffect } from "react";
import {
  getOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../services/orchid/orchidService";

export default function Home({ searchQuery }) {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await getOrchids();
      setOrchids(response.data);
    } catch (error) {
      console.error("Error fetching orchids:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (orchid) => {
    try {
      const response = await createOrchid(orchid);
      setOrchids([...orchids, response.data]);
    } catch (error) {
      console.error("Error creating orchid:", error);
    }
  };

  const handleUpdate = async (id, updatedOrchid) => {
    try {
      const response = await updateOrchid(id, updatedOrchid);
      setOrchids(
        orchids.map((orchid) => (orchid.id === id ? response.data : orchid)),
      );
    } catch (error) {
      console.error("Error updating orchid:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOrchid(id);
      setOrchids(orchids.filter((orchid) => orchid.id !== id));
    } catch (error) {
      console.error("Error deleting orchid:", error);
    }
  };

  // Hàm này chỉ chạy lại khi searchQuery hoặc orchids thay đổi
  const filteredOrchids = useMemo(() => {
    if (!searchQuery) return orchids;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return orchids.filter((orchid) =>
      orchid.orchidName.toLowerCase().includes(lowerCaseQuery),
    );
  }, [searchQuery, orchids]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page-wrapper">
      <ListofOrchid
        orchid={filteredOrchids}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <div className="mt-5 pt-4 border-top">
        <TestCount />
      </div>
    </div>
  );
}
