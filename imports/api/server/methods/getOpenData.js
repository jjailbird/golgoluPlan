import { Meteor } from 'meteor/meteor';
import parser from 'xml2json';
import jsonfile from 'jsonfile';
// import request from 'request';
// import libxmljs from 'libxmljs';
// import { parseString } from 'xml2js';
// import path from 'path';

if (Meteor.isServer) {
  Meteor.methods({
    'opendata.FoodNutition.save'() {
      this.unblock();
      try {
        const serviceKey = 'zRIDnmUqwnvIfqFVTcUjjwDQMeLWUuDExEPccfWYZSPqZExXGcIQJdstBLh0ugqso6hjheNlhg0NXhu6CeVrvQ%3D%3D';
        const saveFileName = 'OpenData.foodNutrition.02.json';
        const response = Meteor.http.call(
          'GET',
          `http://apis.data.go.kr/1470000/FoodNtrIrdntInfoService/getFoodNtrItdntList?ServiceKey=${serviceKey}`,
          {
            params: {
              // ServiceKey: serviceKey,
              numOfRows: 100,
              pageNo: 1,
            },
          }
        );
        // console.log('response', response);
        // console.log('response', response.content);
        const foodNutriXml = response.content;
        const foodNutriJson = parser.toJson(foodNutriXml);
        const foodNutriJsonDoc = JSON.parse(foodNutriJson);
       
        const saveJsonDoc = foodNutriJsonDoc.response.body.items.item;

        console.log('foodNutriJson', saveJsonDoc, typeof saveJsonDoc);
       
        const dirPath = '/data/golgoluplan/opendata/foodNutriData/';
        const filePath = dirPath + saveFileName;
        console.log('filePath', filePath);
        jsonfile.spaces = 2;
        jsonfile.writeFileSync(filePath, saveJsonDoc);
      } catch (e) {
        console.log(e);
      }
    },
  });
}
