import api from "../api";


interface Vagas{
  numVaga:number;
  disp:boolean;
}


export const getVagas = async (): Promise<Vagas[]> => {
  try {
    const endpoint = '/vagas';
    const response = await api.get<Vagas[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const getVagasDisponiveis = async (): Promise<number[]> => {
  try {
    const endpoint = '/vagasdisponiveis';
    const response = await api.get<number[]>(endpoint);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};

export const getVagasIdEstacionar = async (id:number): Promise<number> => {
  try {
    const endpoint = '/vagasdisponiveis';
    const response = await api.get<{id: number}>(endpoint);
    return response.data.id;  
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error; 
  }
};
