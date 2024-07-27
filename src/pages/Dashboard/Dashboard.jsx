import { urlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateLink } from "@/components/CreateLink/CreateLink";
import LinkCard from "@/components/LinkCard/LinkCard";
import Error from "@/components/Error/Error";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = urlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls && urls.length > 0) {
      fnClicks();
    }
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg md:text-xl">{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg md:text-xl">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Filter className="absolute top-3 right-3 text-gray-500" />
      </div>

      {error && <Error message={error?.message} />}

      <div className="flex flex-col gap-4">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};
