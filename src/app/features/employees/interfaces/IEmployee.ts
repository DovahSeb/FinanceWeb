export interface EmployeeRequest {
    firstName: string;
    otherName?: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    dateJoined?: string;
    departmentId: number;
    postTitleId: number;
}

export interface EmployeeResponse {
    id: number;
    firstName: string;
    otherName?: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    dateJoined?: string;
    department: string;
    postTitle: string;
    isActive: string;
}