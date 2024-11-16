class APIFeature {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    
    filter() {
        //Exclude page, sort, limit, fields out of query for after to process
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(ele => delete queryObj[ele]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/, match => `$${match}`);

        // Create a query from user request
        this.query = this.query.find(JSON.parse(queryStr));

        // Or use this syntax
        // const query = Tour.find()
        //             .where('duration').equals(5)
        //             .where('difficulty').equals('easy');      
        return this;
    }

    sort() {
        //Sorting if sort is requested
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        //Select fields if (fields) is requested
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }
        return this;
    }

    paginate() {
        //Pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        
        return this;
    }
}

export default APIFeature;