export interface Location{
    city:string;
    province: string;
}
type Status = 'success' |  'error';

//Type para respuesta de la api
export interface ApiResponse{
    status: Status;
    message: string;
}
export interface ApiResponseError {
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
    userId:string;
    username: string;
    name: string;
    lastName: string;
    location:Location;
    bio: string;
    role: string;
    avatarUrl:string;
    token:string;
}
export interface LoginApiResponse extends ApiResponse {
    user: UserData;   
}

//type para reestablecer password
export type ResetPasswordFormData = Pick<RegisterFormData, 'email'>;

export interface ResetPasswordFormDataWithToken {
    password:string;
    passwordrep: string;
    token: string;
}

//Types para NewCatPost
export type TypeOfPublication = "encontrado" | "perdido" | "adopción" |'';
export type Gender = "macho" | "hembra" | "desconocido" |'';
export type PublicationStatus = "activo" | "resuelto";

export interface CatPostFormData{
    typeOfPublication: TypeOfPublication
    catName?: string;
    gender: Gender;
    age?: string;
    breed?: string; 
    description: string;
    city:string;
    province: string;
    photo: File | null;
}
export interface CatPost{
      _id:string;
      userId: string;
      date:Date;
      typeOfPublication: TypeOfPublication;
      gender: string;
      catName: string;
      age?:string;
      description:string;
      breed?:string;
      location:Location;
      photoUrl:string;
      photoId:string;
      publicationStatus: PublicationStatus
}
export interface ApiCatPostResponse{
      status:Status,
      message: string, 
      post: CatPost 
}
export interface ApiCatGetResponse{
      status:Status,
      message: string, 
      posts: CatPost[] 
}

export interface ApiSingleCatPostResponse {
    status: Status;
    message: string;
    post: CatPost; 
}

//type para los comentarios
export interface PostComment {
    _id:string
    catPostid: string;
    userId: UserInfo;
    text: string;
    createdAt: Date;
}

export type PostCommentFormData = Pick<PostComment, 'text'>; //Type para crear los comentarios

export interface UserInfo {
    _id:string;
    avatarUrl:string;
    username:string;
}
export interface PostFullData{
    _id: string;
    age: string;
    breed: string;
    catName:string;
    date: Date
    description: string;
    gender: Gender;
    location: Location;
    photoUrl: string;
    publicationStatus: PublicationStatus;
    typeOfPublication: TypeOfPublication;
    userId: UserInfo;
}
export interface ApiCommentResponse extends ApiResponse {
    post: PostFullData;
    comments: PostComment[];
}
export interface ApiPostCommentResponse extends ApiResponse{
    comment:PostComment;
    userId: UserInfo;
}
//Para edición del perfil
export interface ProfileFormData{
    name:string;
    lastName:string;
    bio?:string;
    location:Location;
    photo?: File | null;
}
export interface ApiEditProfileResponse extends ApiResponse{
    user:UserData;
}



