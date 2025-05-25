export interface IDiscover{
    id: string;
    title: string;
    description: string;
    city: string;
    category: string;
    tags: string[];
    salary: string;
    deadline: string;
    createdAt: string;
    company: {
        id: string;
        name: string;
        logo: string;
    }
}