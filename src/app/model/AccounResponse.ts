export default interface AccountResponse{
    id:string;
    full_name:string;
    email:string;
    avatar:string;
    background:string;
    isActive: boolean;
    nonLocked: boolean;
    rewardPoints: number;
}