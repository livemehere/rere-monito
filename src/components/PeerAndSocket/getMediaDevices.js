function getMediaDevices(callback){
    try{
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true,
        }).then((stream)=>{
            callback(stream)
        })
    }catch (e) {
        console.log(e)
        return undefined;
    }
}

export default getMediaDevices;