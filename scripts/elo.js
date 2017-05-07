module.exports = {

    getNewRating: function(oldRating, outcome, expectedOutcome){
        var newRating = oldRating + (32*(outcome - expectedOutcome));
        return newRating;
    },

    getExpectedOutcome: function(ratingA, ratingB){
        //Will return the expected outcome for the first parameter player
        var denom = 1 + Math.pow(10, ((ratingB - ratingA)/400));
        var expectedOutcome = 1/denom;
        return expectedOutcome;
    }
};
