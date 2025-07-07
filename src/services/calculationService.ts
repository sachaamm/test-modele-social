import Engine, { formatValue } from "publicodes";
import rules from "modele-social";
import { situationLiberaleNonReglemente } from "../situations.js";
import { CalculationResult } from "../interfaces/calculation-result.dto.js";

export class CalculationService {
  private engine: Engine;

  constructor() {
    this.engine = new Engine(rules);
  }

  public calculateCotisationsAndRemuneration(
    recettes: number,
    charges: number
  ): CalculationResult {
    // Update the engine situation with the new values
    this.engine.setSituation({
      ...situationLiberaleNonReglemente,
      "entreprise . chiffre d'affaires": recettes,
      "entreprise . charges": charges,
    });

    // Calculate the cotisations
    const cotisationResult = this.engine.evaluate({
      valeur: "dirigeant . indépendant . cotisations et contributions",
      unité: "€/an",
    });

    const rémunérationNetteResult = this.engine.evaluate({
      valeur: "dirigeant . rémunération . net",
      unité: "€/an",
    });

    const remunerationApresImpotsResult = this.engine.evaluate({
      valeur: "dirigeant . rémunération . net . après impôt",
      unité: "€/an",
    });

    const cotisationString = formatValue(cotisationResult);
    const remunerationNetteString = formatValue(rémunérationNetteResult);
    const remunerationApresImpotsString = formatValue(
      remunerationApresImpotsResult
    );

    const cotisationAsNumber = Number(
      cotisationString.replace(/[^0-9.-]/g, "")
    );
    const remunerationNetteAsNumber = Number(
      remunerationNetteString.replace(/[^0-9.-]/g, "")
    );
    const remunerationApresImpotsAsNumber = Number(
      remunerationApresImpotsString.replace(/[^0-9.-]/g, "")
    );

    console.log(cotisationAsNumber);

    return {
      cotisations: cotisationAsNumber,
      remunerationNette: remunerationNetteAsNumber,
      remunerationApresImpots: remunerationApresImpotsAsNumber,
    };
  }
}
