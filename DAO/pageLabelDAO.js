const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

exports.createPageLabel = async (details) => {
  try {
    let date = new Date();
    let pageLabel = await models.page_map.create({
      Page_id: details.page,
      Label_id: details.label,
      Created_date: date,
      Updated_date: date,
    });
    return { Success: true, PageLabel: pageLabel };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getPageLabel = async (id) => {
  try {
    let pageLabel = await models.page_map.findAll({
      where: {
        Page_map_id: id,
      },
      include: [
        { model: models.label, as: "Label" },
        { model: models.page, as: "Page" },
      ],
    });
    return { Success: true, Pagelabel: pageLabel };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getPageLabels = async (pageId, langId) => {
  try {
    let pageLabels = await models.page_map.findAll({
      where: {
        Page_id: pageId,
      },
      include: [{ model: models.label, as: "Label",
       where: {
           Language_id: langId
       } ,
       attributes: ['Label_name', 'Label_value']
    }],
    });
    console.log(pageLabels)
    return { Success: true, Pagelabels: pageLabels };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
