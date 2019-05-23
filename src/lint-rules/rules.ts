export const rules = [
  {
    sourceTag: "app",
    onlyDependOnLibsWithTags: ["shared", "feature:shared", "feature:api"]
  },
  {
    sourceTag: "shared",
    onlyDependOnLibsWithTags: ["shared"]
  },
  {
    sourceTag: "feature:lazy",
    onlyDependOnLibsWithTags: ["shared", "feature:shared", "feature:api"]
  },
  {
    sourceTag: "feature:api",
    onlyDependOnLibsWithTags: ["feature:api", "shared"]
  },
  {
    sourceTag: "feature:shared",
    onlyDependOnLibsWithTags: ["shared", "feature:api"]
  }
];
