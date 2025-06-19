import { IResume } from "@/types/resume";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import { useState } from "react";
import { ResumeSchema } from "@/schema/resumeSchema";
import axios from "@/lib/axios";
import { AxiosError } from "axios";
import CreateSummary from "./resume/createSummary";
import CreateExperience from "./resume/createExperience";
import CreateEducation from "./resume/createEducation";
import CreateLeadership from "./resume/createLeadership";
import CreateAdditional from "./resume/createAdditional";
import { normalizeResume } from "@/helper/normalizerResume";

interface IProps {
  token?: string;
  setResume: (resume: IResume) => void;
  setIsCreating: (value: boolean) => void;
  initialResume?: IResume;
  isEditMode?: boolean;
}

export default function ResumeForm({
  token,
  setResume,
  setIsCreating,
  initialResume,
  isEditMode = false,
}: IProps) {
  const [loading, setLoading] = useState(false);

  const defaultValues: IResume = {
    summary: "",
    workExperience: [],
    education: [],
    leadership: [],
    additional: [],
  };

  const handleSubmit = async (values: IResume) => {
    try {
      setLoading(true);

      const url = "/resumes";
      const method = isEditMode ? axios.put : axios.post;

      const { data } = await method(url, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResume(data.resume);
      toast.success(
        `Resume ${isEditMode ? "updated" : "created"} successfully!`
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "Submit failed");
        console.error(err.response?.data);
      } else {
        toast.error("Something went wrong");
        console.error(err);
      }
    } finally {
      setLoading(false);
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={
          initialResume ? normalizeResume(initialResume) : defaultValues
        }
        validationSchema={ResumeSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched }) => (
          <Form className="space-y-4 text-sm text-gray-800">
            <CreateSummary touched={touched.summary} errors={errors.summary} />
            <CreateExperience values={values} />
            <CreateEducation values={values} />
            <CreateLeadership values={values} />
            <CreateAdditional values={values} />

            <div className="flex justify-between mt-6 gap-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="w-full border border-black px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full text-white px-4 py-2 border rounded bg-gray-400 hover:bg-gray-600"
                disabled={loading}
              >
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Submitting..."
                  : isEditMode
                  ? "Update Resume"
                  : "Submit Resume"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
