import React, { useEffect, useState } from "react";

import MasonryLayout from "./MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";
import { useRecoilState } from "recoil";
import { deleteState, saveState } from "../atoms/modalAtom";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useRecoilState(saveState);
  const [deleted, setDeleted] = useRecoilState(deleteState);

  useEffect(() => {
    if (searchTerm.trim()) {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
        setSaved(false);
        setDeleted(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
        setSaved(false);
        setDeleted(false);
      });
    }
  }, [searchTerm, saved, deleted]);

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
