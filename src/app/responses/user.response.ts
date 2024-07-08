import { Role } from "./role";

export class UserResponse {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    background: string;
    isActive: boolean;
    nonLocked: boolean = true;
    rewardPoints: number;
    role: Role;
  
    constructor(data?: Partial<UserResponse>) {
      this.id = data?.id || '';
      this.fullName = data?.fullName || '';
      this.email = data?.email || '';
      this.avatar = data?.avatar || '';
      this.background = data?.background || '';
      this.isActive = data?.isActive || false;
      this.nonLocked = data?.nonLocked !== undefined ? data?.nonLocked : true;
      this.rewardPoints = data?.rewardPoints || 0;
      this.role = data?.role || {  name: '' };
    }
  }