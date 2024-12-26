class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  title: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Remove unwanted fields
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        // Handle tags if provided
        if (this.queryStr.tags) {
            const tagsArray = this.queryStr.tags.split(',');
            this.query = this.query.find({ tags: { $all: tagsArray } });
        }

        return this;
    }

    pagination(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;