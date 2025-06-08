export interface IWorkExperience {
  id: string;
  company: string;
  jobdesc: { name: string };
  employmentType: string;
  description: string;
  startDate: string;
  endDate?: string;
}

export interface IEducation {
  id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
}

export interface ILeadership {
  id: string;
  organization: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface IAdditional {
  id: string;
  category: "TECHNICAL" | "LANGUAGE" | "INTERPERSONAL";
  items: string[];
  description?: string;
}

export interface IResume {
  id: string;
  summary?: string;
  workExperience: IWorkExperience[];
  education: IEducation[];
  leadership: ILeadership[];
  addtional: IAdditional[];
}
