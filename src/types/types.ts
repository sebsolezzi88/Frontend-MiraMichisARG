export interface Location{
    city:string;
    province: string;
}

//Type para respuesta de la api
export interface ApiResponse{
    status: string;
    message: string;
}

export interface ApiArrayErrorResponse{
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string;
}
export interface ExpressValidatorErrorResponse {
    errors: ApiArrayErrorResponse[];
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
//Type para loguearse
export type LoginFormData = Pick<RegisterFormData, 'username'|'password'>;

//interface loginApiResponse si se loguea correctamente
export interface UserData {
    username: string,
    name: string,
    lastName: string,
    role: string,
    token:string
}
export interface LoginApiResponse extends ApiResponse {
    username: UserData;   
}

//type para reestablecer password
export type ResetPasswordFormData = Pick<RegisterFormData, 'email'>;