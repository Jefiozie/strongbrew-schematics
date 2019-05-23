/* tslint:disable */

import { Tree } from "@angular-devkit/schematics";

/**
 * Sorts the keys of the given object.
 * @returns A new object instance with sorted keys
 */
function sortObjectByKeys(obj: object) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => (result[key] = obj[key]) && result, {});
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string
): Tree {
  if (host.exists("package.json")) {
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText);

    if (!json.devDependencies) {
      json.devDependencies = {};
    }

    if (!json.devDependencies[pkg]) {
      json.devDependencies[pkg] = version;
      json.devDependencies = sortObjectByKeys(json.devDependencies);
    }

    host.overwrite("package.json", JSON.stringify(json, null, 2));
  }

  return host;
}

export function readJsonInTree<T = any>(host: Tree, path: string): T {
  if (!host.exists(path)) {
    throw new Error(`Cannot find ${path}`);
  }
  const contents = host.read(path)!.toString("utf-8");
  try {
    return JSON.parse(contents);
  } catch (e) {
    throw new Error(`Cannot parse ${path}: ${e.message}`);
  }
}
