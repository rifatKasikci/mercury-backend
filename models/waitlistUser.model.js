module.exports = (sequelize, Sequelize) => {
    const WaitlistUser = sequelize.define("waitlistUser", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        isConfirmed: {
            type: Sequelize.BOOLEAN
        }
    },{
        underscored:true
    });

    return WaitlistUser;
}