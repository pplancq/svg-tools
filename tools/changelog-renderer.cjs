const DefaultChangelogRenderer = require('nx/release/changelog-renderer').default;

const DEPENDENCY_SCOPE = 'deps';

class CustomChangelogRenderer extends DefaultChangelogRenderer {
  renderChangesByType() {
    const dependencyChanges = this.relevantChanges.filter(
      (change) => change.scope?.trim() === DEPENDENCY_SCOPE
    );
    const otherChanges = this.relevantChanges.filter(
      (change) => change.scope?.trim() !== DEPENDENCY_SCOPE
    );

    const originalRelevantChanges = this.relevantChanges;
    this.relevantChanges = otherChanges;

    const markdownLines = super.renderChangesByType();

    if (dependencyChanges.length > 0) {
      markdownLines.push('', '### 📦 Dependencies', '');

      const dependencyChangesByType = this.groupChangesByTypeFor(dependencyChanges);
      const changeTypes = this.conventionalCommitsConfig?.types ?? {};

      for (const type of Object.keys(changeTypes)) {
        const group = dependencyChangesByType[type];
        if (!group || group.length === 0) {
          continue;
        }

        for (const change of group) {
          const line = this.formatChange(change);
          markdownLines.push(line);
          if (change.isBreaking && !this.isVersionPlans) {
            this.breakingChanges.push(this.formatBreakingChange(change));
          }
        }
      }
    }

    this.relevantChanges = originalRelevantChanges;
    return markdownLines;
  }

  groupChangesByTypeFor(changes) {
    const typeGroups = {};
    for (const change of changes) {
      typeGroups[change.type] = typeGroups[change.type] ?? [];
      typeGroups[change.type].push(change);
    }
    return typeGroups;
  }
}

module.exports = CustomChangelogRenderer;
module.exports.default = CustomChangelogRenderer;
