# Strongbrew Schematics

## How to use with new NX project

- Create a NX Workspace

```bash
npm install -g @nrwl/schematics
npm install -g @angular/cli
create-nx-workspace [your workspace name]
```

- Install `@strongbrew/schematics`

```bash
ng add @strongbrew/schematics
```

This will update the lint rules to the `strongbrew rules`

## How to use with a existing NX project

- Install `@strongbrew/schematics`

```bash
ng add @strongbrew/schematics
```

This will update the lint rules to the `strongbrew rules`

---

Supported schematic commands:

1. `ng-add`: this can be used via the `@angular/cli`
2. `lint-rules`: with a existing project just run `ng g @strongbrew/schematics:lint-rules`

Original from [kevinschuchard.com/blog/2018-11-20-schematic-sandbox/](https://www.kevinschuchard.com/blog/2018-11-20-schematic-sandbox/)
