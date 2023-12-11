import api from "../api";

interface Cliente {
  id:number;
  nome: string;
  cpf: string;
  telefone: string;
}
interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano:number;
  cor:string;
  marca:string;
  cliente:Cliente;
}

export const postCar = async (car:Car) => {
  try {
    const endpoint = '/car';   
    const response = await api.post <Car>(endpoint, car);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};
export const putCar = async (car:Car) => {
  try {
    const endpoint = '/car';   
    const response = await api.put <Car>(endpoint, car);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};


export const getCar = async (id:Number) => {
  try {
    const endpoint = '/car/'+id;   
    const response = await api.get <Car>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const deleteCar = async (id: Number) =>{
  try{
    const endpoint = '/car/'+id;
    const response = await api.delete <Car>(endpoint);
    if(response.status===204){
      return true;
    }else
      return false;
  }catch(error){
    console.error('Erro na requisição:', error);
    throw error;
  }
}
