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
}

interface Estacionar{
  cliente: Cliente;
  car: Car;  
  numVaga:number;
  entrada?:string;
  saida?:string;
  preco?:number;
  tempoestadia?:number;
}

export const postEstacionar = async (estacionar:Estacionar) => {
  try {
    const endpoint = '/estacionar';   
    const response = await api.post <Estacionar>(endpoint, estacionar);
    return response.data;
  } catch (error) {
      console.error('Erro na requisição:', error);
      throw error; 
  }
};
export const putFinalizaEstacionar = async (idEstacionar:number) => {
  try {
    const endpoint = '/finalizarestacionar/'+idEstacionar;   
    const response = await api.put <Estacionar>(endpoint);
    return response.data;
  } catch (error) {
      console.error('Erro na requisição:', error);
      throw error; 
  }
};
export const deleteFinalizaEstacionar = async (idEstacionar:number) => {
  try {
    const endpoint = '/finalizarestacionar/'+idEstacionar;   
    const response = await api.delete <Estacionar>(endpoint);
    if(response.status===204){
      return true;
    }else{
      return false
    }
  } catch (error) {
      console.error('Erro na requisição:', error);
      throw error; 
  }
};
export const getRegistrosMesAno = async (mes: Number, ano:Number): Promise<Estacionar[]> => {
  try {
    const endpoint = '/listarregistros/'+ano+'/'+mes;
    const response = await api.get<Estacionar[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};
