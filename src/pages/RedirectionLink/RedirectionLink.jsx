import { getLongUrl, storeClicks } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectionLink = () => {
  console.log(">>>>>>INSIDE THIS PAGE");
  debugger;
  const { id } = useParams();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [longUrl, setLongUrl] = useState("");

  const { loading, data, fn } = useFetch(getLongUrl, id);
  const { loading: loadingStats, fn: fnStoreClick } = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    // Fetch URL data
    debugger;
    fn();
  }, []);

  useEffect(() => {
    // Store click when data is available and not redirected yet\
    debugger;
    if (data && !hasRedirected) {
      fnStoreClick();
      setLongUrl(data.original_url);
      setHasRedirected(true);
    }
  }, [data]);

  useEffect(() => {
    // Redirect when the long URL is set
    if (longUrl) {
      window.location.href = longUrl; // Replace with appropriate redirection method
    }
  }, [longUrl]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null; // Render nothing while redirecting
};

export default RedirectionLink;
