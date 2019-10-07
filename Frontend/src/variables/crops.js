const crops = {
    Rice: {
      min_temp: 15,
      max_temp: 27,
      min_rain: 900,
      max_rain: 2500,
      crop: 'Rice',
      soil: [ "clay"],
      disease:["Brown spot","False Smut"],
      url:"https://www.foodunfolded.com/images/uploads/article-images/rice-field-plants.jpg"
    },
    Wheat: {
      min_temp: 12,
      max_temp: 25,
      min_rain: 450,
      max_rain: 650,
      crop: 'Wheat',
      soil: ["loam", "clay", "sandy", "black"],
      disease:["Powdery Mildew","Foot rot","Karnal bunt"],
      url:"https://www.morningagclips.com/wp-content/uploads/2017/05/269084328_9da2058aa1_z.jpg"
    },
    Maize: {
      min_temp: 15,
      max_temp: 27,
      min_rain: 500,
      max_rain: 800,
      crop: 'Maize',
      soil: ["clay", "sandy"],
      disease:["Gray Leaf Spot","Eyespot","Common rust"],
      url:"https://cdn.pixabay.com/photo/2017/08/18/16/25/corn-2655525_960_720.jpg"
    },
    Bajra: {
      min_temp: 25,
      max_temp: 35,
      min_rain: 400,
      max_rain: 600,
      crop: 'Bajra',
      soil: ["sandy", "loam", "red"],
      disease:["Downy Mildew","Ergot","Smut"],
      url:"https://www.agrifarming.in/wp-content/uploads/2015/05/Bajara-Crop..jpg"
    },
    Sugarcane: {
      min_temp: 20,
      max_temp: 35,
      min_rain: 850,
      max_rain: 1650,
      crop: 'Sugarcane',
      soil: ["alluvium", "black", "red", "brown regur"],
      disease:["Black Rot","Brown Stripe"],
      url:"http://agritech.tnau.ac.in/agriculture/CropProduction/Sugarcrops/tnausi7.jpg"
    },
    Cotton: {
      min_temp: 18,
      max_temp: 27,
      min_rain: 600,
      max_rain: 1100,
      crop: 'Cotton',
      soil: ["loam", "black", "red"],
      disease:["Boll rot","Stem Canker"],
      url:"https://www.abc.net.au/news/image/10505992-16x9-700x394.jpg"
    },
    Tea: {
      min_temp: 15,
      max_temp: 35,
      min_rain: 1000,
      max_rain: 2500,
      crop: 'Tea',
      soil: ["light loamy"],
      disease:["Poria root","Blister blight"],
      url:"https://www.agrifarming.in/wp-content/uploads/2015/04/Tea-Garden..jpg"
    },
    Coffee: {
      min_temp: 15,
      max_temp: 28,
      min_rain: 1250,
      max_rain: 2250,
      crop: 'Coffee',
      soil: ["alluvium"],
      disease:["Brown blight","Collar rot"] ,
      url:"https://www.sustainability-times.com/wp-content/uploads/thumbs/coffee_beans_ripe_agriculture_plant_raw_crop_grow_fruit-497366-38o38q0ua2qs69uee0rsao.jpg"
    },
    Cocoa: {
      min_temp: 18,
      max_temp: 35,
      min_rain: 1000,
      max_rain: 2500,
      crop: 'Cocoa',
      soil: ["alluvium"],
      disease:["Black pod","Swollen shoot"],
      url:"https://www.agrifarming.in/wp-content/uploads/2016/06/Cocoa-Cultivation.jpg"
    },
    Jute: {
      min_temp: 25,
      max_temp: 35,
      min_rain: 1500,
      max_rain: 2500,
      crop: 'Jute',
      soil: ["alluvium", "loam"],
      disease:["Brown blight","Collar rot"],
      url:"https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_Field_Bangladesh_%287749587518%29.jpg"
  
    },
    Clove: {
      min_temp: 25,
      max_temp: 35,
      min_rain: 900,
      max_rain: 2500,
      crop: 'Clove',
      soil: ["red alluvial"],
      disease:["Seedling wilt","Leaf rot"],
      url:"http://www.indonesiacloves.com/wp-content/uploads/standard-quality-cloves.jpg"
    },
    Black_Pepper: {
      min_temp: 15,
      max_temp: 40,
      min_rain: 900,
      max_rain: 2500,
      crop: 'Black_Pepper',
      soil: ["sandy loam", "red loam"],
      disease:["Charcoal rot","Foot rot"],
      url:"https://www.agrifarming.in/wp-content/uploads/2015/05/Black-Pepper-Farming1.jpg"
    },
    Cardamom: {
      min_temp: 10,
      max_temp: 35,
      min_rain: 1500,
      max_rain: 4000,
      crop: 'Cardamom',
      soil: ["lateritic"],
      disease:["Capsule rot","Rhizome rot"],
      url:"https://www.agrifarming.in/wp-content/uploads/2015/03/Cardamom-Capsules.jpg"
    },
    Turmeric: {
      min_temp: 20,
      max_temp: 30,
      min_rain: 1500,
      max_rain: 2500,
      crop: 'Turmeric',
      soil: ["red loamy", " clayey loam"],
      disease:["Rhizome rot","Leaf blotch"],
      url:"https://www.agrifarming.in/wp-content/uploads/2015/03/Turmeric-Farming.jpg"
    },
    Groundnut: {
      min_temp: 20,
      max_temp: 30,
      min_rain: 500,
      max_rain: 1500,
      crop: 'Groundnut',
      soil: ["red", "black"],
      disease:["Stem rot","Fusarium Wilt"],
      url:"http://foodhallonline.com/wp-content/uploads/2018/11/groundnut-1.jpg"
    },
    Rabi: {
      min_temp: 15,
      max_temp: 25,
      min_rain: 900,
      max_rain: 2500,
      crop: 'Rabi',
      soil: ["loam", "clay"],
      disease:["Powdery Mildew","Swollen shoot"],
      url:"https://upload.wikimedia.org/wikipedia/commons/9/96/Wheat_P1210892.jpg"
    },
    Kharif: {
      min_temp: 20,
      max_temp: 27,
      min_rain: 250,
      max_rain: 600,
      crop: 'Kharif',
      soil: ["sandy", "loam"],
      disease:["Mung Bean","Mash bean"],
      url:"https://orissadiary.com/wp-content/uploads/2019/09/EFJKDWcU8AABfJW.png"
    }
  };
  
  module.exports = {crops};
  