import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const navigate = useNavigate();

  const [lecturetitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setuploadVideoInfo] = useState(null);
  const [isPreviewFree, setisPreviewFree] = useState(false);
  const [mediaProgress, setmediaProgress] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);

  const { courseId, lectureId } = useParams();

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();

  const [
    removeLecture,
    {
      data: removeLectureData,
      isLoading: removeLectureLoading,
      isSuccess: removeLectureSuccess,
    },
  ] = useRemoveLectureMutation();

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setisPreviewFree(Boolean(lecture.isPreviewFree));
      setuploadVideoInfo(lecture.videoInfo || null);
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setmediaProgress(true);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setuploadProgress(Math.round((loaded * 100) / total));
        },
      });

      if (res.data.success) {
        setuploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Video upload failed");
    } finally {
      setmediaProgress(false);
    }
  };

  const editLectureHandler = async () => {
    if (!lecturetitle.trim()) {
      return toast.error("Lecture title cannot be empty");
    }

    await editLecture({
      lecturetitle,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
      isPreviewFree,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) toast.success(data?.message);
    if (error) toast.error(error?.data?.message || "Update failed");
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeLectureSuccess) {
      toast.success(removeLectureData?.message);
      navigate(`/admin/course/${courseId}/lecture`);
    }
  }, [removeLectureSuccess]);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <Button
          disabled={removeLectureLoading}
          onClick={removeLectureHandler}
          variant="destructive"
        >
          {removeLectureLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </>
          ) : (
            "Remove Lecture"
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Lecture Title */}
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={lecturetitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to JavaScript"
          />
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <Label>Upload Video <span className="text-red-500">*</span></Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="max-w-md"
          />
        </div>

        {/* Video Upload Progress */}
        {mediaProgress && (
          <div className="space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}

        {/* Preview Toggle */}
        <div className="flex items-center gap-3">
          <Switch
            id="isFree"
            checked={isPreviewFree}
            onCheckedChange={setisPreviewFree}
          />
          <Label htmlFor="isFree">
            Is this video going to be free to watch?
          </Label>
        </div>

        {/* Update Button */}
        <div>
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
