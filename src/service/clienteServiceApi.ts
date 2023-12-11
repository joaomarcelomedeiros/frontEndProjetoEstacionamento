import api from "../api";

interface Cliente {
  id:number;
  nome: string;
  cpf: string;
  telefone: string;
  cars: Car[];
}
interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano:number;
  cor:string;
  marca:string;
}

export const getSearchUsers = async (nome: string): Promise<Cliente[]> => {
  try {
    console.log('teste')
    const endpoint = '/clientes/'+nome;
    const response = await api.get<Cliente[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const getCliente = async (id: number): Promise<Cliente> => {
  try {
    console.log('teste')
    const endpoint = '/cliente/'+id;
    const response = await api.get<Cliente>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};
export const postUser = async (cpf:string, nome:string , telefone:string) => {
  try {
    const endpoint = '/cliente';   
    const response = await api.post <Cliente>(endpoint, {cpf, nome, telefone});
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const putUser = async (cliente: Cliente) => {
  try {
    const endpoint = '/cliente'; 
    const response = await api.put<Cliente>(endpoint, cliente);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const deleteUser = async (id: Number) => {
  try{
    const endpoint = '/cliente/'+id;
    const response = await api.delete<Cliente>(endpoint)
    if(response.status==204)
      return true;
    else{
      return false;
    }
  }catch(error:any){
    console.error('Erro na requisição: ', error)
  }
}
