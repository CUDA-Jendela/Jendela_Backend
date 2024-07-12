module.exports = {
    checkSimilarities(arr1, arr2) {
        const similarities = 0;

        arr1.forEach(item => {
            if (arr2.includes(item)) {
                similarities++;
            }
        });

        return similarities;
    }
}