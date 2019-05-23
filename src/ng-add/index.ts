import {
  chain,
  Rule,
  SchematicContext,
  Tree,
  schematic
} from "@angular-devkit/schematics";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";
import { addPackageToPackageJson } from "../utils";

export default function(_options: any): Rule {
  return (_host: Tree, _context: SchematicContext) => {
    return chain([
      addLibrary(_options),
      addInstallTask(_options),
      schematic("lint-rules", _options)
    ]);
  };

  function addInstallTask(options: any) {
    return (host: Tree, context: SchematicContext) => {
      if (!options.skipInstall) {
        context.addTask(new NodePackageInstallTask());
      }
      return host;
    };
  }

  function addLibrary(_options: any) {
    return (host: Tree) => {
      addPackageToPackageJson(host, "@strongbrew/schematics", `0.0.1`);
    };
  }
}
