// Define the DTO interfaces
export interface RecettesChargesDTO {
  recettes: {
    valeur: number;
    unité: string;
  };
  charges: {
    valeur: number;
    unité: string;
  };
}
