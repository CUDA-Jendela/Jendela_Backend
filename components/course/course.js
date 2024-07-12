class Course {
    constructor(ngoID, name, description, skills, quota, startDate, endDate) {
        this.ngoID = ngoID;
        this.name = name;
        this.description = description;
        this.skills = skills;
        this.quota = quota;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

module.exports = Course;