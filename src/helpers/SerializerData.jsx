export const SerializerData=(target)=>{
    const formData = new FormData(target)
    const dataObject={}
    for(let [name,value] of formData.entries()){
        dataObject[name]=value
    }
    return dataObject

}