import ListofOrchid from "./ListofOrchid";
import TestCount from "./TestCount";
import { listofOrchids } from "../data/ListofOrchid";
import { useMemo } from "react";

export default function Home({ searchQuery }) {
  // Hàm này chỉ chạy lại khi searchQuery hoặc listofOrchids thay đổi
  const filteredOrchids = useMemo(() => {
    if (!searchQuery) return listofOrchids;

    const lowerCaseQuery = searchQuery.toLowerCase();

    return listofOrchids.filter((orchid) =>
      orchid.orchidName.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  return (
    <div className="home-page-wrapper">
      <ListofOrchid orchid={filteredOrchids} />

      <div className="mt-5 pt-4 border-top">
        <TestCount />
      </div>
    </div>
  );
}
