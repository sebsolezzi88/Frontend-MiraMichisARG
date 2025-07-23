export const areEmptyFields = (object:Object):boolean => {
    return Object.values(object).some(value => value === "");
};

export const formatDate = (date:Date) =>{
    const formatedDate = new Date(date).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
    return formatedDate;
}

export const capitalize = (text:string):string=>{
    return text.charAt(0).toUpperCase() + text.slice(1);
}