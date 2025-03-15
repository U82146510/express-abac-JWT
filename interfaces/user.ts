export interface user_body{
    name:string;
    role:"admin"|"user"
};
export interface login_body{
    name:string;
};

export function assertUser(value:any):asserts value is user_body{
    if(!value||!("name" in value)||value===null){
        throw new Error('assert function');
    }
};