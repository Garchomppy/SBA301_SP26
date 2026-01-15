import ListofOrchid from "./ListofOrchid";
import TestCount from "./TestCount";
import { listofOrchids } from "../data/ListofOrchid";
import { useEffect, useState } from "react";

export default function Home({ searchQuery }) {
  const [filteredOrchids, setFilteredOrchids] = useState(listofOrchids);

  useEffect(() => {
    const filtered = listofOrchids.filter((orchid) =>
      orchid.orchidName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrchids(filtered);
  }, [searchQuery]);

  return (
    <>
      <ListofOrchid orchid={filteredOrchids} />
      <TestCount />
    </>
  );
}
