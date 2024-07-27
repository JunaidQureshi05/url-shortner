import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import useFetch from "../../hooks/useFetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { urlState } from "../../context";
import { QRCode } from "react-qrcode-logo";
import Error from "../Error/Error";

export function CreateLink() {
  const { user } = urlState();
  const navigate = useNavigate();
  const ref = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="mt-4 md:mt-0">
          Create New Link
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New</DialogTitle>
        </DialogHeader>
        {error && <Error message={error?.message} />}
        {formValues?.longUrl && (
          <div className="flex justify-center my-4">
            <QRCode ref={ref} size={150} value={formValues?.longUrl} />
          </div>
        )}
        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
          className="mb-2"
        />
        {errors.title && <Error message={errors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your long URL"
          value={formValues.longUrl}
          onChange={handleChange}
          className="mb-2"
        />
        {errors.longUrl && <Error message={errors.longUrl} />}
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
          <Card className="p-2 flex-shrink-0">trimrr.in</Card>
          <div className="flex-1">
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
        </div>
        {errors.customUrl && <Error message={errors.customUrl} />}
        <DialogFooter className="flex justify-center sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
