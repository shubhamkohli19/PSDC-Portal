export interface NetworkRequest {
    id: number;
    networkRequestId: string;
    contactName: string;
    designation: string;
    departmentId: number;
    deviceType: string;
    contactNo: string;
    floorAddress: string;
    roomNo: string;
    locationTypeId: string;
    district: string;
    location: string;
    address: string;
    siteName: string;
    email: string;
    macIdWired: string;
    macIdWifi: string;
    engineerComment: string;
    engineerId: number;
    remarks: string;
    comment: string;
    status: string;
    reason: string;
    adhaarNumber: string;
    declaration: string;
    userId: number;
    userTo: number;
    roleId: number;
    officerName: string;
    officerMobile: string;
    officerDesignation: string;
    govtEmailId: string;
    emailVerifiedAt: Date;
    isWithdrawal: number;
    isClosedBy: string;
    requestTime: Date;
    forwardTimeEngineer: Date;
    forwardTimeHelpdesk: Date;
    withdrawalReason: string;
    withdrawalStatus: string;
    withdrawalRequestDate: Date;
    withdrawalForwardTimeEngineer: Date;
    withdrawalForwardTimeHelpdesk: Date;
    withdrawalClosedBy: string;
    duration: string;
    emailStatus: boolean;
    emailSentTime: Date;
    createdAt: Date;
    updatedAt: Date;
    isCommented: boolean;
  }
  