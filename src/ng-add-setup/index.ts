import {
  chain,
  Rule,
  schematic,
  SchematicContext,
  Tree
} from "@angular-devkit/schematics";

export default function(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    return chain([schematic("lint-rules", _options)])(_tree, _context);
  };
}
