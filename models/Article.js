module.exports = function(sequelize, DataTypes) {
    // define entity
    var Article = sequelize.define('Article', {
      title: {
        type: DataTypes.STRING,
        field: 'title'
      },
      abstract: {
        type: DataTypes.STRING,
        field: 'abstract'
      },
      authors: {
        type: DataTypes.STRING,
        field: 'authors'
      },
      keywords: {
        type: DataTypes.STRING,
        field: 'keywords'
      },
      url: {
        type: DataTypes.STRING,
        field: 'url'
      }
    }, {
      timestamps: false,
      tableName: 'articles'
    });
    
    return Article;
}