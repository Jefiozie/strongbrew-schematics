import { JsonObject } from "@angular-devkit/core";
import {
  chain,
  Rule,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";
import { rules } from "./rules";
import { readJsonInTree } from "../utils";
import { Schema } from "./schema";

export default function(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([upgradeToStrongbrewRules()])(_tree, _context);
  };

  function upgradeToStrongbrewRules(): Rule {
    return (tree: Tree, context: SchematicContext) => {
      const tslintPath = "tslint.json";
      const nxJson = "nx.json";

      if (tree.exists(tslintPath)) {
        const tslint = readJsonInTree(tree, tslintPath) as JsonObject & {
          rules: { "nx-enforce-module-boundaries": any };
        };

        const nxFile = readJsonInTree(tree, nxJson) as JsonObject & {
          devDependencies: any;
        };

        // ignore if there are no tslint rules
        if (!tslint) return tree;
        //only run when nx is present
        if (!nxFile) {
          context.logger.info("NX is not found");
          return tree;
        }

        // if nx is already present (or at least the linting rules)
        if (tslint.rules["nx-enforce-module-boundaries"]) {
          context.logger.info("Upgrading your rules to Strongbrew NX Rules");

          const nxRules = tslint.rules["nx-enforce-module-boundaries"];
          // Add the boundaries
          nxRules[1].depConstraints = [...rules];

          context.logger.info("Upgrading succesfully to Strongbrew NX Rules");
        } else {
          // add the nx implementation
          tslint.rules["nx-enforce-module-boundaries"] = [
            true,
            {
              allow: [],
              depConstraints: [...rules]
            }
          ];
        }

        tree.overwrite(tslintPath, JSON.stringify(tslint, null, 2));
      } else {
        context.logger.info(
          `unable to locate tslint file at ${tslintPath}, conflicting styles may exists`
        );
      }

      return tree;
    };
  }
}
