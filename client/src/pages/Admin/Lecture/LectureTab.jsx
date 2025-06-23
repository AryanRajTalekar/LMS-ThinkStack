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
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lecturetitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setuploadVideoInfo] = useState(null);
  const [isPreviewFree, setisPreviewFree] = useState(false);
  const [mediaProgress, setmediaProgress] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  const [btnDisable, setbtnDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
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
          setbtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        comsole.log(error);
        toast.error("video upload failed");
      } finally {
        setmediaProgress(false);
      }
    }
  };

  const params = useParams();

  const { courseId, lectureId } = params;

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

  const editLectureHandler = async () => {
    await editLecture({
      lecturetitle,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
      isPreviewFree: isPreviewFree,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (removeLectureSuccess) {
      toast.success(removeLectureData.message);
      // Navigate(`/courseId/lecture`)
    }
  }, [removeLectureSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setisPreviewFree(Boolean(lecture.isPreviewFree)); 
      setuploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  return (
    <Card>
      <CardHeader className="flex flex-col justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 ">
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
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lecturetitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex . Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-50">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="w-fit"
            placeholder="Ex . Introduction to Javascript"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="isFree"
            checked={isPreviewFree}
            onCheckedChange={setisPreviewFree}
          />

          <Label htmlFor="isFree">
            Is This Video Going to be Free To Watch?
          </Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}%uploaded</p>
          </div>
        )}

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
