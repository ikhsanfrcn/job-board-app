import { IAssessment } from "@/types/assessment";

interface IProps {
  assessments: IAssessment[];
}

export default function Card({ assessments }: IProps) {
  console.log(assessments[0]);
  return <div className="w-full"></div>;
}
