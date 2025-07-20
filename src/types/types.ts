export interface Location{
    city:string;
    province: string;
}

//Types para usar en el registro
export interface RegisterFormData{
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string
    passwordrep:string;
    city:string;
    province: string;
}
export interface RegisterData{
    username: string;
    name: string;
    lastName: string;
    email: string;
    password: string
    passwordrep:string;
    location: Location;
}