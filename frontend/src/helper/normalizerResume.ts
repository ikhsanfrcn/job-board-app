import { IResume } from "@/types/resume";

export function normalizeResume(resume: IResume): IResume {
  return {
    id: resume.id ?? "",
    summary: resume.summary ?? "",
    workExperience: (resume.workExperience || []).map((work) => ({
      id: work.id ?? "",
      company: work.company ?? "",
      jobdesc: {
        name: work.jobdesc?.name ?? "",
      },
      employmentType: work.employmentType ?? "",
      description: work.description ?? "",
      startDate: work.startDate ?? "",
      endDate: work.endDate ?? "",
    })),
    education: (resume.education || []).map((edu) => ({
      id: edu.id ?? "",
      schoolName: edu.schoolName ?? "",
      degree: edu.degree ?? "",
      fieldOfStudy: edu.fieldOfStudy ?? "",
      startDate: edu.startDate ?? "",
      endDate: edu.endDate ?? "",
    })),
    leadership: (resume.leadership || []).map((lead) => ({
      id: lead.id ?? "",
      organization: lead.organization ?? "",
      role: lead.role ?? "",
      description: lead.description ?? "",
      startDate: lead.startDate ?? "",
      endDate: lead.endDate ?? "",
    })),
    additional: (resume.additional || []).map((add) => ({
      id: add.id ?? "",
      category: add.category ?? "TECHNICAL",
      items: add.items?.map((item) => item ?? "") || [""],
      description: add.description ?? "",
    })),
  };
}
