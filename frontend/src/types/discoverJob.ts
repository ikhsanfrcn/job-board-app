export interface IDiscover{
    id: string;
    title: string;
    description: string;
    city: string;
    category: string;
    tags: string[];
    salaryStart: string;
    salaryEnd: string;
    deadline: string;
    createdAt: string;
    isTestActive: string;
    company: {
        id: string;
        name: string;
        logo: string;
    }
}