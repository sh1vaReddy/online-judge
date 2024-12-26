class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }

    search()
    {
        const keyword=this.queryStr.keyword
        ?{
            title:{
                $regex:this.queryStr.keyword,
                $options:'i'
            },
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }

    filter()
    {
        const queryCopy={...this.queryStr};

        const removeFilds=["keyword","page","limit"];
        removeFilds.forEach((key)=>delete queryCopy[key]);

        let queryStr=JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query=this.query.find(JSON.parse(queryStr));

        if(this.queryStr.tags)
        {
            const tagsArray=this.queryStr.tags.spilt(",");
            this.query=this.query.find({tags:{$all:tagsArray}});
        }
        return this;
    }

    pagination(resultpage)
    {
        const currentpage=Number(this.queryStr.page) || 1;
        const skip=resultpage*(currentpage-1);
        this.queryStr=this.query.limit(resultpage).skip(skip);
        return this;
    }

}

export default ApiFeatures;