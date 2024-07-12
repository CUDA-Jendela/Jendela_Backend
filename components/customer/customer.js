class Customer {
    constructor(userID, name, birthDate, city, phoneNumber, profilePicture, skills) {
        this.userID = userID
        this.name = name
        this.birthDate = birthDate
        this.city = city
        this.phoneNumber = phoneNumber
        this.profilePicture = profilePicture
        this.skills = skills
    }
}

module.exports = Customer;