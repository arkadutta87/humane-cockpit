import _ from 'lodash';

export default class WeakSuggestionMarker {

    reset() {
        this.relevancyScores = null;
    }

    mark(input) {
        if (input.multi) {
            _(input.results).values()
              .filter(resultGroup => resultGroup.name !== 'searchQuery')
              .forEach((resultGroup) => {
                  this.storeRelevancyScores(resultGroup.results);
                  return true;
              });

            const deflectionScore = this.calculateDeflectionScore();

            _(input.results).values()
              .filter(resultGroup => resultGroup.name !== 'searchQuery')
              .forEach((suggestionGroup) => {
                  this.markWeakResults(suggestionGroup.results, suggestionGroup.name, deflectionScore);
                  return true;
              });
        } else {
            this.storeRelevancyScores(input.results);
            const deflectionScore = this.calculateDeflectionScore();
            this.markWeakResults(input.results, input.name, deflectionScore);
        }
    }

    storeRelevancyScores(results) {
        if (!this.relevancyScores) {
            this.relevancyScores = [];
        }

        const relevancyScores = this.relevancyScores;

        _.forEach(results, (result) => {
            result._relevancy = result._score / (result._weight || 1.0);
            relevancyScores.push(result._relevancy);
        });
    }

    calculateDeflectionScore() {
        // if (!this.relevancyScores) {
        //     this.relevancyScores = {};
        // }
        //
        // if (!this.relevancyScores[name]) {
        //     this.relevancyScores[name] = [];
        // }
        //
        // const relevancyScores = this.relevancyScores[name];
        const relevancyScores = this.relevancyScores;

        // sort relevancy scores
        relevancyScores.sort((scoreA, scoreB) => scoreB - scoreA);

        // iterate over the relevancy scores to find point at which score drops suddenly.
        let previousRelevancy = 0;
        let deflectionScore = 0;
        _.forEach(relevancyScores, (score) => {
            if (previousRelevancy && score < 0.2 * previousRelevancy) {
                deflectionScore = previousRelevancy;
                return false;
            }

            previousRelevancy = score;

            return true;
        });

        return deflectionScore;
    }

    // eslint-disable-next-line class-methods-use-this
    markWeakResults(results, name, deflectionScore) {
        _.forEach(results, (result) => {
            if (result._relevancy >= deflectionScore) {
                return true;
            }

            result._weakResult = true;
            return true;
        });
    }
}