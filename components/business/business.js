class Business {
    constructor(
        userID,
        name,
        industry,
        description,
        address,
        phoneNumber,
        logoPicture
    ) {
        this.userID = userID;
        this.name = name;
        this.industry = industry;
        this.description = description;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.logoPicture = logoPicture;
    }
}

module.exports = Business;
