import DeviceStats from "@/components/DeviceStats";
import Location from "@/components/Location";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/useFetch";
import { downloadImage, getHostName } from "@/utils/helpers";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {
  const { id } = useParams();
  const { user } = urlState();
  const navigate = useNavigate();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });
  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
    error: errStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id, {
    user_id: user?.id,
  });

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error]);

  let link = url?.custom_url ?? url?.short_url;

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      )}
      <div className="flex flex-col gap-6 md:gap-8 md:flex-row">
        <div className="flex flex-col items-start gap-6 md:gap-8 md:w-2/5">
          <span className="text-3xl md:text-5xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`${getHostName()}/${url?.short_url}`}
            target="_blank"
            className="text-xl md:text-2xl text-blue-400 font-bold hover:underline cursor-pointer"
            onClick={() => {
              window.open(`${getHostName()}/${link}`, "_blank");
            }}
          >
            {getHostName()}/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 text-sm md:text-lg hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="text-xs md:text-sm font-extralight">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${getHostName()}/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={() => downloadImage(url)}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          <img
            src={url?.qr_code}
            className="w-full max-w-xs md:max-w-sm self-center md:self-start ring ring-blue-500 p-1 object-contain"
            alt="qr code"
          />
        </div>
        <Card className="md:w-3/5">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl font-extrabold">
              Stats
            </CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
