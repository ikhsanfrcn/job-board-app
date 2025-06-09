import { IResume } from "@/types/resume";

interface IProps {
  resume: IResume;
}
export default function ResumeDetail({ resume }: IProps) {
  return (
    <>
      <div>
        <h2 className="font-semibold border-b mb-2">Summary</h2>
        <p className="text-sm text-gray-700">
          {resume.summary || "No summary provided."}
        </p>
      </div>

      <div>
        <h2 className="font-semibold border-b mb-2">Work Experience</h2>
        {resume.workExperience.map((exp) => (
          <div key={exp.id} className="mt-2 pb-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold">{exp.company}</p>
                <p className="text-sm text-gray-600">
                  {exp.jobdesc?.name}{" "}
                  <span className="italic">
                    ({exp.employmentType.toLowerCase()})
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(exp.startDate))}{" "}
                -{" "}
                {exp.endDate
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(exp.endDate))
                  : "Present"}
              </p>
            </div>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold border-b mb-2">Education</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} className="mt-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold">{edu.schoolName}</p>
                <p className="text-sm text-gray-600">
                  {edu.degree}, {edu.fieldOfStudy}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  year: "numeric",
                }).format(new Date(edu.startDate))}{" "}
                -{" "}
                {edu.endDate
                  ? new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      year: "numeric",
                    }).format(new Date(edu.endDate))
                  : "Present"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold border-b mb-2">Leadership</h2>
        {resume.leadership.map((lead) => (
          <div key={lead.id} className="mt-2">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-semibold">{lead.organization}</p>
                <p className="text-sm text-gray-600">{lead.role}</p>
              </div>
              <p className="text-sm text-gray-600">
                {new Date(lead.startDate).toLocaleString("en-US", {
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {lead.endDate
                  ? new Date(lead.endDate).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>
            <p className="text-sm">{lead.description}</p>
          </div>
        ))}
      </div>

      {resume.additional?.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-800 border-b pb-2 mb-4">
            Additional Information
          </h2>
          {resume.additional.map((item) => (
            <div key={item.id} className="text-sm text-gray-700 mb-3">
              <div className="flex items-start">
                <div className="min-w-[140px] font-semibold text-gray-800">
                  {item.category.charAt(0).toUpperCase() +
                    item.category.slice(1).toLowerCase()}
                  :
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    {item.items.join(", ").toLowerCase()}
                  </p>
                  {item.description && (
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
