const {
    getDownloadURL,
    ref,
    uploadBytes,
    deleteObject,
  } = require("firebase/storage");
  const storage = require("../config/fireStorage");

  //recibe como parametro un archivo foto, la sube a firebase y devuelve el url
  const subirFoto = async (foto) => {
    try{
    const storageRef = ref(storage, `fotoPerfil/${foto.name}`)
    await uploadBytes(storageRef, foto.data, {
        contentType: foto.mimetype})
    const url = await getDownloadURL(storageRef)
    return url;}
    catch(error){
        throw new Error(error);
    }
  }

  //recibe el url de la foto guardada en la base de datos y la borra de firebase
  //retorna true si se completo con exito
  const borrarFoto = async (url) => {
    try{
    const urlRef = ref(storage, url);
    await deleteObject(urlRef);
    return true;
    }catch(error){
        throw new Error(error);
    }
  }