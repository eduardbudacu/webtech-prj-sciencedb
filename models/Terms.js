module.exports = function(sequelize, DataTypes) {
    // define entity
    var Terms = sequelize.define('Term', {
      term: {
        type: DataTypes.STRING,
        field: 'term'
      },
      term_ro: {
        type: DataTypes.STRING,
        field: 'term_ro'
      },
      definition: {
        type: DataTypes.STRING,
        field: 'definition'
      },
      definition_ro: {
        type: DataTypes.STRING,
        field: 'definition_ro'
      }
    }, {
      timestamps: false,
      tableName: 'terms'
    });
    
    return Terms;
}